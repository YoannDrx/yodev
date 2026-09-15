import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dark default, explicit preference, mobile navigation and localized destination', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Changer le thème', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const nav = page.getByRole('navigation', { name: 'Navigation mobile' });
  await nav.getByRole('link', { name: 'À propos', exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/a-propos$/);
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('old routes preserve language and target the relevant service section', async ({ page }) => {
  for (const [old, target] of [['/fr/methode','/fr/services#methode'], ['/fr/offres','/fr/services#formats'], ['/en/method','/en/services#methode'], ['/en/offers','/en/services#formats']]) {
    await page.goto(old);
    await expect(page).toHaveURL(new RegExp(target + '$'));
    await expect(page.locator('#' + target.split('#')[1])).toBeVisible();
  }
});

test('product index, product status and both languages remain accessible', async ({ page }) => {
  for (const locale of ['fr','en']) {
    for (const product of ['mail','ads','spend']) {
      await page.goto(`/${locale}/${product}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('main').getByRole('link').first()).toBeVisible();
      expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
    }
  }
});

test('contact validates, retains input after a real server failure and supports retry success', async ({ page }) => {
  await page.goto('/fr/contact');
  await page.getByRole('button', { name: 'Envoyer la demande' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Nom *', { exact: true }).fill('Test local');
  await page.getByLabel('Email professionnel *', { exact: true }).fill('local@example.invalid');
  const message = page.getByLabel('Contexte et résultat attendu *', { exact: true });
  await message.fill('Un outil de test pour vérifier le formulaire localement.');
  const failure = page.waitForResponse(r => r.url().endsWith('/api/contact'));
  await page.getByRole('button', { name: 'Envoyer la demande' }).click();
  expect((await failure).status()).toBe(503);
  await expect(page.getByRole('alert').filter({hasText:'La demande'})).toBeVisible();
  await expect(message).toHaveValue('Un outil de test pour vérifier le formulaire localement.');
  await expect(page.getByLabel('Nom *', {exact:true})).toHaveValue('Test local');
  // Only the successful delivery response is simulated; no provider receives an email.
  await page.route('**/api/contact', route => route.fulfill({status:200,json:{ok:true}}));
  await page.getByRole('button', { name: 'Envoyer la demande' }).click();
  await expect(page.getByRole('status')).toContainText('Demande transmise');
});

test('responsive layout, keyboard entry and contrast in both themes', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390,768,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/fr');
    for (const theme of ['dark','light']) {
      if (!(await page.locator('html').getAttribute('data-theme'))?.includes(theme)) await page.getByRole('button',{name:'Changer le thème',exact:true}).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
      await page.screenshot({path:testInfo.outputPath(`yodev-${width}-${theme}.png`)});
    }
  }
  await page.goto('/fr');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Aller au contenu'})).toBeFocused();
});


test('brand icons and localized sharing images are served as images', async ({request}) => {
  for (const path of ['/icon','/apple-icon','/fr/opengraph-image','/en/opengraph-image','/fr/mail/opengraph-image','/en/ads/opengraph-image','/fr/spend/opengraph-image']) {
    const response=await request.get(path);expect(response.status()).toBe(200);expect(response.headers()['content-type']).toContain('image/png');
  }
});
