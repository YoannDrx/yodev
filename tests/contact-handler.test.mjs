import assert from 'node:assert/strict';
import test from 'node:test';
import { createContactHandler, CONTACT_BODY_BYTES } from '../src/lib/server/contact-handler.ts';
const payload = { name: 'A', email: 'synthetic@example.invalid', organization: '', projectType: 'product', budget: '', product: 'spend', message: 'A synthetic enquiry for a product demonstration.', locale: 'en', website: '' };
const requestId = '11111111-1111-4111-8111-111111111111';
const env = { NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://www.yodev.fr', RESEND_API_KEY: 'test-secret', RESEND_FROM_EMAIL: 'from@example.invalid', CONTACT_EMAIL: 'to@example.invalid' };
function request(body = payload, headers = {}) {
  return new Request('https://www.yodev.fr/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', 'x-contact-request-id': requestId, ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
function setup(options = {}) {
  const sends = [], events = [];
  const handler = createContactHandler({ env, log: e => events.push(e), limit: async () => ({ allowed: true, retryAfter: 0 }), fetcher: async (url, options) => { sends.push({ url, options }); return Response.json({ id: 'provider-id' }); }, ...options });
  return { handler, sends, events };
}
test('delivers normalized product context, escapes HTML and never logs personal content', async () => {
  const { handler, sends, events } = setup();
  const response = await handler(request({ ...payload, name: '  A  ', message: 'A <script>private synthetic message</script>' }));
  assert.equal(response.status, 200);
  assert.equal(sends.length, 1);
  const sent = JSON.parse(sends[0].options.body);
  assert.equal(sent.reply_to, payload.email);
  assert.deepEqual(sent.to, [env.CONTACT_EMAIL]);
  assert.match(sent.subject, /spend/);
  assert.match(sent.html, /&lt;script&gt;/);
  assert.match(sent.text, /Yodev spend/);
  assert.equal(sends[0].options.headers['Idempotency-Key'], 'contact-' + requestId);
  assert.ok(sends[0].options.signal instanceof AbortSignal);
  assert.equal(events[0].providerId, 'provider-id');
  assert.equal(events[0].product, 'spend');
  const logs = JSON.stringify(events);
  for (const value of [payload.email, 'private synthetic message', env.RESEND_API_KEY, env.CONTACT_EMAIL]) assert.ok(!logs.includes(value));
  assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('same request ID is preserved on retries', async () => {
  const { handler, sends } = setup();
  await handler(request()); await handler(request());
  assert.equal(sends[0].options.headers['Idempotency-Key'], sends[1].options.headers['Idempotency-Key']);
});
test('rejects malformed, invalid, wrong-origin and non-JSON requests without contacting provider', async () => {
  const { handler, sends } = setup();
  for (const [req, status] of [
    [request('{'), 400], [request({ ...payload, product: 'unknown' }), 400],
    [request(payload, { 'content-type': 'text/plain' }), 415],
    [request(payload, { origin: 'https://attacker.invalid' }), 403],
    [request(payload, { 'x-contact-request-id': 'arbitrary-personal-data' }), 400],
    [request({ ...payload, name: '\r\n', message: '   ' }), 400],
  ]) assert.equal((await handler(req)).status, status);
  assert.equal(sends.length, 0);
  const invalid = await (await handler(request({ ...payload, message: '   short   ' }))).json();
  assert.deepEqual(invalid.fields, { message: 'too_short' });
});
test('enforces body limit using streamed bytes, not just Content-Length', async () => {
  const { handler } = setup();
  assert.equal((await handler(request(payload, { 'content-length': String(CONTACT_BODY_BYTES + 1) }))).status, 413);
  const chunks = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(CONTACT_BODY_BYTES)); controller.enqueue(new Uint8Array(1)); controller.close(); } });
  const streamed = new Request('https://www.yodev.fr/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: chunks, duplex: 'half' });
  assert.equal((await handler(streamed)).status, 413);
});
test('slow request body has a deadline', async () => {
  const { handler } = setup({ bodyTimeoutMs: 10 });
  const body = new ReadableStream({ start() {} });
  const req = new Request('https://www.yodev.fr/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body, duplex: 'half' });
  assert.equal((await handler(req)).status, 408);
});
test('honeypot acknowledges without invoking limiter or provider', async () => {
  const { handler, sends } = setup({ limit: async () => { throw new Error('must not run'); } });
  assert.equal((await handler(request({ ...payload, website: 'bot.invalid' }))).status, 200);
  assert.equal(sends.length, 0);
});
test('missing email configuration and unavailable limiter fail closed', async () => {
  for (const options of [{ env: {} }, { limit: async () => { throw new Error('synthetic'); } }]) {
    const { handler, sends } = setup(options);
    assert.equal((await handler(request())).status, 503);
    assert.equal(sends.length, 0);
  }
});
test('rate limit returns retry time and never sends', async () => {
  const { handler, sends } = setup({ limit: async () => ({ allowed: false, retryAfter: 120 }) });
  const r = await handler(request());
  assert.equal(r.status, 429); assert.equal(r.headers.get('retry-after'), '120'); assert.equal(sends.length, 0);
});
for (const [status, outcome] of [[401, 'provider_auth'], [403, 'provider_auth'], [429, 'provider_quota'], [500, 'provider_error']]) {
  test(`provider ${status} has private diagnostic category and generic public error`, async () => {
    const { handler, events } = setup({ fetcher: async () => new Response('secret provider error', { status }) });
    const r = await handler(request());
    assert.equal(r.status, 502); assert.equal(events[0].outcome, outcome); assert.equal(events[0].providerStatus, status);
    assert.ok(!(await r.text()).includes('secret provider error'));
  });
}
test('provider network error and invalid success are not acknowledged as delivery', async () => {
  for (const fetcher of [async () => { throw new Error('private network diagnostic'); }, async () => Response.json({})]) {
    const { handler, events } = setup({ fetcher });
    assert.equal((await handler(request())).status, 502);
    assert.ok(!JSON.stringify(events).includes('private network diagnostic'));
  }
});
test('provider deadline aborts fetch and preserves a retryable public response', async () => {
  const keepAlive = setTimeout(() => {}, 1000);
  try {
    const { handler, events } = setup({ deliveryTimeoutMs: 10, fetcher: async (_url, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(options.signal.reason), { once: true })) });
    const r = await handler(request());
    assert.equal(r.status, 504); assert.equal((await r.json()).code, 'DELIVERY_TIMEOUT'); assert.equal(events[0].outcome, 'provider_timeout');
  } finally { clearTimeout(keepAlive); }
});
