import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

async function fillContact(page: import('@playwright/test').Page) {
  await page.locator('[name="name"]').fill('A');
  await page.locator('[name="email"]').fill('synthetic@example.invalid');
  await page.locator('[name="message"]').fill('Synthetic local test of the product enquiry form.');
}

test('product context reaches the payload and remains selected through a language switch', async ({ page }) => {
  await page.goto('/fr/spend');
  await page.getByRole('link', { name: 'Parlons-en', exact: true }).click();
  await expect(page.locator('[name="product"]')).toHaveValue('spend');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Yodev Spend');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/en/contact?product=spend');
  await expect(page.locator('[name="product"]')).toHaveValue('spend');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Yodev Spend');
  await fillContact(page);
  let submitted;
  await page.route('**/api/contact', async route => {
    submitted = route.request().postDataJSON();
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.getByRole('button', { name: 'Send the request', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Request submitted');
  expect(submitted).toMatchObject({ name: 'A', product: 'spend', locale: 'en' });
  await expect(page.getByRole('status')).toBeFocused();
});

test('trimmed validation focuses the field; pending submission locks input and reuses its ID after failure', async ({ page }) => {
  await page.goto('/fr/contact?product=ads');
  await fillContact(page);
  await page.locator('[name="message"]').fill('        trop court       ');
  await page.getByRole('button', { name: 'Envoyer la demande', exact: true }).click();
  await expect(page.locator('[name="message"]')).toBeFocused();
  await expect(page.locator('[name="message"]')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Décrivez votre besoin en au moins 20 caractères', { exact: false })).toBeVisible();
  await page.locator('[name="message"]').fill('Synthetic local test of the product enquiry form.');
  const ids: string[] = [];
  let finishFirst!: () => void;
  const pending = new Promise<void>(resolve => { finishFirst = resolve; });
  await page.route('**/api/contact', async route => {
    ids.push(route.request().headers()['x-contact-request-id']);
    if (ids.length === 1) {
      await pending;
      await route.fulfill({ status: 504, json: { ok: false, code: 'DELIVERY_TIMEOUT' } });
    } else await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.getByRole('button', { name: 'Envoyer la demande', exact: true }).click();
  await expect(page.locator('[name="message"]')).toBeDisabled();
  await expect(page.locator('[name="product"]')).toBeDisabled();
  await expect.poll(() => ids.length).toBe(1);
  finishFirst();
  await expect(page.locator('form').getByRole('alert')).toContainText('garde son identifiant');
  await expect(page.locator('[name="message"]')).toHaveValue('Synthetic local test of the product enquiry form.');
  const storage = await page.evaluate(() => JSON.stringify(sessionStorage));
  expect(storage).not.toContain('synthetic@example.invalid');
  expect(storage).not.toContain('Synthetic local test');
  await page.getByRole('button', { name: 'Envoyer la demande', exact: true }).click();
  await expect(page.getByRole('status')).toBeVisible();
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
  expect(await page.evaluate(() => sessionStorage.getItem('yodev-contact-receipt-v1'))).toBeNull();
});

test('client deadline unlocks fields, and rate-limit feedback includes the waiting time', async ({ page }) => {
  await page.goto('/en/contact');
  await fillContact(page);
  await page.clock.install();
  await page.route('**/api/contact', () => {});
  await page.getByRole('button', { name: 'Send the request', exact: true }).click();
  await expect(page.locator('[name="message"]')).toBeDisabled();
  await page.clock.fastForward(18_100);
  await expect(page.locator('form').getByRole('alert')).toContainText('taking too long');
  await expect(page.locator('[name="message"]')).toBeEnabled();
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', route => route.fulfill({ status: 429, headers: { 'Retry-After': '120' }, json: { ok: false, code: 'RATE_LIMITED' } }));
  await page.getByRole('button', { name: 'Send the request', exact: true }).click();
  await expect(page.locator('form').getByRole('alert')).toContainText('2 minute(s)');
});

test('changing language warns before losing an unsent request and cancellation retains it', async ({ page }) => {
  await page.goto('/fr/contact?product=mail');
  await fillContact(page);
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/fr/contact?product=mail');
  await expect(page.locator('[name="name"]')).toHaveValue('A');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL('/en/contact?product=mail');
  await expect(page.locator('[name="product"]')).toHaveValue('mail');
});

test('every editorial page has its own canonical metadata and security headers', async ({ page }) => {
  const paths = ['/fr', '/fr/services', '/fr/realisations', '/fr/a-propos', '/fr/contact', '/fr/mentions-legales', '/fr/mentions-legales/confidentialite', '/en', '/en/services', '/en/work', '/en/about', '/en/contact', '/en/legal', '/en/legal/privacy'];
  const titles = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['x-content-type-options']).toBe('nosniff');
    expect(response?.headers()['x-frame-options']).toBe('DENY');
    expect(response?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(response?.headers()['content-security-policy']).not.toContain('unsafe-eval');
    expect(response?.headers()['x-powered-by']).toBeUndefined();
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.yodev.fr${path}`);
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  }
  expect(titles.size).toBe(paths.length);
  expect(errors).toEqual([]);
});

test('legal content is visible without JavaScript and unknown pages return localized 404', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ['/fr/mentions-legales', '/fr/mentions-legales/confidentialite', '/en/legal', '/en/legal/privacy']) {
    await page.goto(`http://127.0.0.1:3920${path}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.locator('main').innerText()).toContain('Yodev');
    const hidden = await page.locator('main').evaluate(element => [...element.querySelectorAll('h1,h2,p')].filter(node => getComputedStyle(node).opacity === '0').length);
    expect(hidden).toBe(0);
  }
  await page.goto("http://127.0.0.1:3920/fr/contact");
  await expect(page.locator("[name=message]")).toBeDisabled();
  await expect(page.getByText("Activez JavaScript pour utiliser ce formulaire", { exact: false })).toBeVisible();
  await expect(page.locator("form")).toHaveAttribute("method", "post");
  await context.close();
  for (const locale of ['fr', 'en']) {
    const response = await request.get(`/${locale}/missing-synthetic-page`);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain(locale === 'fr' ? 'Cette page n’existe pas.' : 'This page does not exist.');
  }
});

test('contact and privacy remain accessible at 320px in both languages', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ['/fr/contact?product=spend', '/en/contact', '/fr/mentions-legales/confidentialite', '/en/legal/privacy']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
    if (path.includes('product=spend')) await page.screenshot({ path: testInfo.outputPath('contact-product-320.png'), fullPage: true });
  }
});

test('read-only deployment smoke checks all public routes and sitemap without sending email', async () => {
  const { stdout } = await promisify(execFile)(process.execPath, ['scripts/smoke.mjs', '--url', 'http://127.0.0.1:3920']);
  expect(stdout).toContain('PASS read-only smoke');
});
