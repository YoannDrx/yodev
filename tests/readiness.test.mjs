import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
const env = { VERCEL: '1', NEXT_PUBLIC_SITE_URL: 'https://www.yodev.fr', RESEND_API_KEY: 'synthetic-api-key', RESEND_FROM_EMAIL: 'Yodev <sender@example.invalid>', CONTACT_EMAIL: 'recipient@example.invalid', CONTACT_REDIS_REST_URL: 'https://redis.example.invalid', CONTACT_REDIS_REST_TOKEN: 'synthetic-token', CONTACT_RATE_LIMIT_SECRET: 'synthetic-random-value-longer-than-32-characters' };
function run(values) { return spawnSync(process.execPath, ['scripts/check-readiness.mjs'], { env: values, encoding: 'utf8' }); }
test('release configuration check requires every contact dependency and never prints values', () => {
  assert.equal(run(env).status, 0);
  for (const key of Object.keys(env).filter(key => key !== 'VERCEL')) {
    const result = run({ ...env, [key]: '' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, new RegExp(key));
    for (const value of Object.values(env).filter(value => value.length > 10)) assert.ok(!result.stderr.includes(value));
  }
});
test('release configuration accepts the Upstash integration names without copying the token', () => {
  const { CONTACT_REDIS_REST_URL: url, CONTACT_REDIS_REST_TOKEN: token, ...rest } = env;
  assert.equal(run({ ...rest, KV_REST_API_URL: url, KV_REST_API_TOKEN: token }).status, 0);
  assert.equal(run({ ...rest, UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token }).status, 0);
  assert.equal(run({ ...rest, KV_REST_API_URL: 'http://redis.example.invalid', KV_REST_API_TOKEN: token }).status, 1);
  assert.equal(run({ ...rest, KV_REST_API_URL: url, KV_REST_API_READ_ONLY_TOKEN: token }).status, 1);
});
test('release configuration rejects unsafe URLs, ambiguous recipients and missing ingress trust', () => {
  for (const invalid of [
    { NEXT_PUBLIC_SITE_URL: 'https://user:secret@example.invalid/path' },
    { CONTACT_REDIS_REST_URL: 'http://redis.example.invalid' },
    { CONTACT_RATE_LIMIT_SECRET: 'short' },
    { CONTACT_EMAIL: 'one@example.invalid,two@example.invalid' },
    { VERCEL: '' },
  ]) assert.equal(run({ ...env, ...invalid }).status, 1);
});
