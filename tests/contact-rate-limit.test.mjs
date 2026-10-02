import assert from 'node:assert/strict';
import test from 'node:test';
import { contactClientIp, createContactRateLimiter } from '../src/lib/server/contact-rate-limit.ts';
const env = { VERCEL: '1', VERCEL_ENV: 'production', CONTACT_REDIS_REST_URL: 'https://redis.example.invalid', CONTACT_REDIS_REST_TOKEN: 'synthetic-token', CONTACT_RATE_LIMIT_SECRET: 'synthetic-secret-at-least-32-characters' };
const request = new Request('https://www.yodev.fr', { headers: { 'x-vercel-forwarded-for': '192.0.2.1', 'x-forwarded-for': '192.0.2.2' } });
test('only trusts the configured ingress and normalizes IPv6', () => {
  assert.equal(contactClientIp(request, {}), 'unknown');
  assert.equal(contactClientIp(request, env), '192.0.2.1');
  assert.equal(contactClientIp(request, { CONTACT_TRUSTED_IP_HEADER: 'x-forwarded-for' }), '192.0.2.2');
  const headers = { 'x-vercel-forwarded-for': '192.0.2.1, 192.0.2.2' };
  assert.equal(contactClientIp(new Request(request, { headers }), env), 'unknown');
  assert.equal(contactClientIp(new Request(request, { headers: { 'x-vercel-forwarded-for': '2001:0db8:0:0::1' } }), env), '[2001:db8::1]');
});
test('keys contain HMAC identities, share a cluster tag and separate environments', async () => {
  const calls = [];
  const fetcher = async (_url, options) => { calls.push(options); return Response.json({ result: [1, 0] }); };
  await createContactRateLimiter(env, fetcher)(request, 'Person@example.invalid');
  await createContactRateLimiter(env, fetcher)(request, 'person@example.invalid');
  await createContactRateLimiter({ ...env, VERCEL_ENV: 'preview' }, fetcher)(request, 'person@example.invalid');
  const commands = calls.map(call => JSON.parse(call.body));
  assert.deepEqual(commands[0], commands[1]);
  assert.notDeepEqual(commands[0].slice(3, 7), commands[2].slice(3, 7));
  const keys = commands[0].slice(3, 7);
  assert.equal(new Set(keys.map(key => key.match(/\{[^}]+\}/)[0])).size, 1);
  assert.equal(commands[0][0], 'EVAL');
  for (const value of ['192.0.2.1', 'person@example.invalid', env.CONTACT_RATE_LIMIT_SECRET]) assert.ok(!calls[0].body.includes(value));
  assert.equal(calls[0].redirect, 'error');
});
test('fails closed for absent configuration, network errors and malformed responses', async () => {
  await assert.rejects(createContactRateLimiter({})(request, 'person@example.invalid'), /NOT_CONFIGURED/);
  await assert.rejects(createContactRateLimiter({ ...env, CONTACT_REDIS_REST_URL: 'http://insecure.invalid' })(request, 'person@example.invalid'), /INVALID_LIMITER_URL/);
  for (const body of [{}, { error: 'failure' }, { result: [1] }, { result: [2, 0] }, { result: [0, -1] }, { result: [0, 86401] }]) {
    await assert.rejects(createContactRateLimiter(env, async () => Response.json(body))(request, 'person@example.invalid'), /INVALID_LIMITER_RESPONSE/);
  }
  await assert.rejects(createContactRateLimiter(env, async () => { throw new Error('offline'); })(request, 'person@example.invalid'));
  assert.deepEqual(await createContactRateLimiter(env, async () => Response.json({ result: [0, 899] }))(request, 'person@example.invalid'), { allowed: false, retryAfter: 899 });
});
