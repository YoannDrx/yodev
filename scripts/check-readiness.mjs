// Checks configuration shape only. Never prints values or contacts providers.
const env = process.env;
const failures = [];
const requireValue = key => {
  if (!env[key]?.trim()) failures.push(`${key}: missing`);
};
for (const key of ['NEXT_PUBLIC_SITE_URL', 'RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'CONTACT_EMAIL', 'CONTACT_REDIS_REST_URL', 'CONTACT_REDIS_REST_TOKEN', 'CONTACT_RATE_LIMIT_SECRET']) requireValue(key);
function secureOrigin(key, originOnly = false) {
  if (!env[key]) return;
  try {
    const url = new URL(env[key]);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || (originOnly && url.pathname !== '/')) throw new Error();
  } catch { failures.push(`${key}: expected an HTTPS ${originOnly ? 'origin' : 'URL'} without credentials or query`); }
}
secureOrigin('NEXT_PUBLIC_SITE_URL', true);
secureOrigin('CONTACT_REDIS_REST_URL');
if (env.NEXT_PUBLIC_BOOKING_URL) secureOrigin('NEXT_PUBLIC_BOOKING_URL');
if (env.CONTACT_RATE_LIMIT_SECRET && (env.CONTACT_RATE_LIMIT_SECRET.length < 32 || /^(change|replace|example)/i.test(env.CONTACT_RATE_LIMIT_SECRET))) failures.push('CONTACT_RATE_LIMIT_SECRET: requires at least 32 random characters, not a placeholder');
if (env.CONTACT_EMAIL && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(env.CONTACT_EMAIL)) failures.push('CONTACT_EMAIL: expected one mailbox');
if (env.RESEND_FROM_EMAIL && (!/@/.test(env.RESEND_FROM_EMAIL) || /[\r\n]/.test(env.RESEND_FROM_EMAIL))) failures.push('RESEND_FROM_EMAIL: invalid sender format');
if (env.VERCEL !== '1' && !env.CONTACT_TRUSTED_IP_HEADER) failures.push('CONTACT_TRUSTED_IP_HEADER: configure an ingress-overwritten header outside Vercel');
if (env.CONTACT_TRUSTED_IP_HEADER && !/^[a-zA-Z0-9-]+$/.test(env.CONTACT_TRUSTED_IP_HEADER)) failures.push('CONTACT_TRUSTED_IP_HEADER: invalid header name');
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else console.log('Configuration shape OK. This does not verify credentials, Redis access, DNS, email delivery, retention or alerts.');
