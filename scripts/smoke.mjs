import { parseArgs } from 'node:util';
const { values } = parseArgs({ options: { url: { type: 'string' }, canonical: { type: 'string', default: 'https://www.yodev.fr' } }, args: process.argv.slice(2).filter(arg => arg !== '--') });
if (!values.url) throw new Error('Usage: pnpm smoke --url https://your-deployment --canonical https://www.yodev.fr');
const base = new URL(values.url);
if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash) throw new Error('Expected a site origin without credentials, path or query');
const canonical = new URL(values.canonical).origin;
const groups = { fr: ['', '/services', '/realisations', '/a-propos', '/contact', '/mail', '/ads', '/spend', '/mentions-legales', '/mentions-legales/confidentialite'], en: ['', '/services', '/work', '/about', '/contact', '/mail', '/ads', '/spend', '/legal', '/legal/privacy'] };
let failures = 0;
async function check(path, status, contentCheck = () => true) {
  try {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15_000), redirect: 'manual' });
    const body = await response.text();
    if (response.status !== status || !contentCheck(body, response)) throw new Error('status/content/header mismatch');
    console.log(`OK ${path}`);
  } catch { failures++; console.error(`FAIL ${path}`); }
}
for (const [locale, paths] of Object.entries(groups)) for (const path of paths) {
  const route = `/${locale}${path}`;
  await check(route, 200, (html, response) => html.includes(`rel="canonical" href="${canonical}${route}"`) && response.headers.get('x-content-type-options') === 'nosniff' && response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"));
}
await check('/sitemap.xml', 200, body => Object.entries(groups).every(([locale, paths]) => paths.every(path => body.includes(`<loc>${canonical}/${locale}${path}</loc>`))));
await check('/robots.txt', 200, body => body.includes(`Sitemap: ${canonical}/sitemap.xml`));
for (const locale of ['fr', 'en']) await check(`/${locale}/missing-smoke-page`, 404);
console.log(`${failures ? 'FAILED' : 'PASS'} read-only smoke. No email was sent; no provider health was verified.`);
process.exitCode = failures ? 1 : 0;
