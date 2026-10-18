import { parseArgs } from 'node:util';
import { randomUUID } from 'node:crypto';
const { values } = parseArgs({ options: { url: { type: 'string' }, send: { type: 'boolean', default: false }, locale: { type: 'string', default: 'fr' }, id: { type: 'string' } }, args: process.argv.slice(2).filter(arg => arg !== '--') });
if (!values.url || !['fr', 'en'].includes(values.locale)) throw new Error('Usage: CONTACT_TEST_REPLY_TO=<authorized test mailbox> pnpm contact:smoke --url https://preview --locale fr [--send] [--id <same UUID for a retry>]');
const base = new URL(values.url);
if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash) throw new Error('Expected a site origin without credentials, path or query');
const id = values.id ?? randomUUID();
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new Error('Invalid request UUID');
console.log(`Recipe ${values.locale}, request ID ${id}. Fixed configured CONTACT_EMAIL recipient; one API request only.`);
if (!values.send) {
  console.log('Dry run. No network request. Set an authorized CONTACT_TEST_REPLY_TO and add --send only when the preview recipient is confirmed.');
} else {
  const email = process.env.CONTACT_TEST_REPLY_TO;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Set CONTACT_TEST_REPLY_TO to an authorized test mailbox');
  const response = await fetch(new URL('/api/contact', base), {
    method: 'POST', redirect: 'error', signal: AbortSignal.timeout(18_000),
    headers: { 'Content-Type': 'application/json', Origin: base.origin, 'X-Contact-Request-Id': id },
    body: JSON.stringify({ name: 'Recette Yodev', email, organization: 'Test synthétique', projectType: 'audit', budget: '', product: 'spend', locale: values.locale, website: '', message: `Test synthétique de réception Yodev (${values.locale}). Vérifier contenu, reply-to et unicité, puis supprimer ce message selon le runbook.` }),
  });
  const body = await response.json();
  console.log(`HTTP ${response.status}; accepted=${body.ok === true}; request ID ${id}`);
  if (!response.ok || body.ok !== true) process.exitCode = 1;
  else console.log('API acceptance only. Record provider delivered event, inbox receipt, reply-to and absence of duplicates separately.');
}
