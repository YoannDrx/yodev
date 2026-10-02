import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { createContactRateLimiter, CONTACT_LIMIT_SCRIPT } from '../../src/lib/server/contact-rate-limit.ts';
const exec = promisify(execFile);
let directory, socket, server;
async function redis(...args) {
  const { stdout } = await exec('redis-cli', ['--json', '-s', socket, ...args.map(String)]);
  const value = JSON.parse(stdout);
  if (typeof value === 'string' && value.startsWith('error:')) throw new Error(value);
  return value;
}
before(async () => {
  directory = await mkdtemp(join(tmpdir(), 'yodev-redis-'));
  socket = join(directory, 'redis.sock');
  server = spawn('redis-server', ['--port', '0', '--unixsocket', socket, '--unixsocketperm', '700', '--save', '', '--appendonly', 'no'], { stdio: 'ignore' });
  let failure;
  server.on('error', error => { failure = error; });
  for (let i = 0; i < 100; i++) {
    if (failure) throw new Error('Install redis-server and redis-cli to run test:redis', { cause: failure });
    try { if (await redis('PING') === 'PONG') return; } catch { /* Socket not ready yet. */ }
    await delay(20);
  }
  throw new Error('Disposable Redis did not start');
});
after(async () => {
  if (server?.pid && server.exitCode === null) {
    const exited = new Promise(resolve => server.once('exit', resolve));
    server.kill('SIGTERM');
    await exited;
  }
  if (directory) await rm(directory, { recursive: true, force: true });
});
const env = { VERCEL: '1', CONTACT_REDIS_REST_URL: 'https://redis.example.invalid', CONTACT_REDIS_REST_TOKEN: 'test', CONTACT_RATE_LIMIT_SECRET: 'test-secret-longer-than-thirty-two-characters' };
// Real Lua evaluation through a disposable Redis, with only its REST transport replaced.
const transport = async (_url, options) => Response.json({ result: await redis(...JSON.parse(options.body)) });
const req = ip => new Request('https://www.yodev.fr', { headers: { 'x-vercel-forwarded-for': ip } });
test('two independent instances admit exactly three simultaneous requests per email', async () => {
  await redis('FLUSHDB');
  const instances = [createContactRateLimiter(env, transport), createContactRateLimiter(env, transport)];
  const results = await Promise.all(Array.from({ length: 20 }, (_, i) => instances[i % 2](req(`192.0.2.${i + 1}`), 'same@example.invalid')));
  assert.equal(results.filter(result => result.allowed).length, 3);
  assert.ok(results.filter(result => !result.allowed).every(result => result.retryAfter > 0 && result.retryAfter <= 900));
  const keys = await redis('KEYS', '*');
  for (const key of keys) assert.ok(await redis('TTL', key) > 0);
  const emailKey = keys.find(key => key.includes(':email:'));
  assert.equal(await redis('GET', emailKey), '3');
  await redis('EXPIRE', emailKey, 12);
  assert.equal((await instances[0](req('192.0.2.100'), 'same@example.invalid')).allowed, false);
  assert.ok(await redis('TTL', emailKey) <= 12, 'denial must not extend expiration');
});
test('IP quota is shared across email addresses', async () => {
  await redis('FLUSHDB');
  const limit = createContactRateLimiter(env, transport);
  const results = await Promise.all(Array.from({ length: 10 }, (_, i) => limit(req('192.0.2.1'), `test${i}@example.invalid`)));
  assert.equal(results.filter(result => result.allowed).length, 5);
});
test('global hourly and daily caps apply across distinct visitors', async () => {
  for (const [quota, count] of [['hour', 100], ['day', 500]]) {
    await redis('FLUSHDB');
    const limit = createContactRateLimiter(env, transport);
    await limit(req('192.0.2.1'), 'one@example.invalid');
    const key = (await redis('KEYS', '*')).find(key => key.includes(`:${quota}:`));
    await redis('SET', key, count, 'EX', 60);
    assert.deepEqual(await limit(req('192.0.2.2'), 'two@example.invalid'), { allowed: false, retryAfter: 60 });
  }
});
test('expired window admits a request again without permanent counters', async () => {
  const key = 'test:{expiry}:ip';
  assert.deepEqual(await redis('EVAL', CONTACT_LIMIT_SCRIPT, 1, key, 1, 1), [1, 0]);
  assert.equal((await redis('EVAL', CONTACT_LIMIT_SCRIPT, 1, key, 1, 1))[0], 0);
  await delay(1100);
  assert.deepEqual(await redis('EVAL', CONTACT_LIMIT_SCRIPT, 1, key, 1, 1), [1, 0]);
});
