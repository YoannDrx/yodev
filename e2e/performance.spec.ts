import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

test('cold mobile production baseline', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    const metrics = { lcpMs: 0, cls: 0 };
    Object.assign(window, { yodevMetrics: metrics });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.lcpMs = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) metrics.cls += shift.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/fr', { waitUntil: 'networkidle' });
  await expect(page.locator('[name="message"]')).toBeEnabled();
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const scripts = resources.filter(resource => new URL(resource.name).pathname.endsWith('.js'));
    return {
      ...(window as typeof window & { yodevMetrics: { lcpMs: number; cls: number } }).yodevMetrics,
      ttfbMs: navigation.responseStart - navigation.requestStart,
      scripts: scripts.length,
      jsDecodedBytes: scripts.reduce((sum, resource) => sum + resource.decodedBodySize, 0),
      jsTransferredBytes: scripts.reduce((sum, resource) => sum + resource.transferSize, 0),
      totalTransferredBytes: navigation.transferSize + resources.reduce((sum, resource) => sum + resource.transferSize, 0),
      profile: 'Chromium, cold cache, 390x844, 1.6Mbps down/750Kbps up, 150ms latency, CPU x4, local next start',
    };
  });
  const metricsPath = testInfo.outputPath('cold-mobile-metrics.json');
  await writeFile(metricsPath, JSON.stringify(metrics, null, 2) + '\n');
  await testInfo.attach('cold-mobile-metrics.json', { path: metricsPath, contentType: 'application/json' });
  console.log('COLD_MOBILE_METRICS ' + JSON.stringify(metrics));
  expect(metrics.jsTransferredBytes).toBeGreaterThan(0);
  // Baseline 2026-10-02: 623 kB decoded / 197 kB transferred. Allow ~13–14% headroom.
  // Timing is reported, not gated: CI hardware and the local server are not field data.
  expect(metrics.jsDecodedBytes).toBeLessThanOrEqual(700_000);
  expect(metrics.jsTransferredBytes).toBeLessThanOrEqual(225_000);
});
