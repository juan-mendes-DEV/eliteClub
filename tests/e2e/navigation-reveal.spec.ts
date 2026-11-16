import { expect, test, type Page } from '@playwright/test';

async function expectRouteContent(page: Page, heading: RegExp, revealTarget?: string) {
  const title = page.getByRole('heading', { level: 1, name: heading }).first();
  await expect(title).toBeVisible();
  await expectEffectivelyVisible(title);
  if (revealTarget) await expectEffectivelyVisible(page.locator(revealTarget).first());
}

async function expectEffectivelyVisible(locator: import('@playwright/test').Locator) {
  await expect(locator).toBeVisible();
  await expect.poll(async () => locator.evaluate((element) => {
    let effectiveOpacity = 1;
    let rendered = true;
    const ancestors: { element: string; opacity: number; display: string; visibility: string }[] = [];
    let current: Element | null = element;
    while (current) {
      const style = getComputedStyle(current);
      const opacity = Number.parseFloat(style.opacity);
      effectiveOpacity *= opacity;
      ancestors.push({ element: current.tagName.toLowerCase(), opacity, display: style.display, visibility: style.visibility });
      if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse' || style.contentVisibility === 'hidden') {
        rendered = false;
      }
      current = current.parentElement;
    }
    return { visible: rendered && effectiveOpacity > 0.95, effectiveOpacity, ancestors };
  })).toMatchObject({ visible: true });
}

test('App Router revela conteúdo após cliques e histórico do navegador sem recarregar páginas', async ({ page }) => {
  const documentRequests: string[] = [];
  const errors: string[] = [];
  page.on('request', (request) => { if (request.resourceType() === 'document') documentRequests.push(request.url()); });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error' && !message.text().includes('/_next/hmr')) errors.push(message.text()); });

  // This is the sole full navigation in the sequence. All following steps are link clicks/history.
  await page.goto('/');
  await expectRouteContent(page, /O que depende de você/);
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'The Elite Way' }).click();
  await expect(page).toHaveURL(/\/the-elite-way$/);
  await expectRouteContent(page, /O que depende de você, hoje/, '.stoic-hero h1[data-reveal]');

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Academy' }).click();
  await expect(page).toHaveURL(/\/academy$/);
  await expectRouteContent(page, /Elite Academy/, '.product-hero-inner [data-reveal]');

  await page.getByRole('link', { name: 'Elite Club, início' }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole('link', { name: 'Começar a reflexão' }).click();
  await expect(page).toHaveURL(/\/diagnostico$/);
  await expectRouteContent(page, /Diagnóstico Elite.*reflexão estoica/);

  await page.getByRole('link', { name: 'Elite Club, início' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expectRouteContent(page, /O que depende de você/);
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Journal' }).click();
  await expect(page).toHaveURL(/\/journal$/);
  await expectRouteContent(page, /Elite Journal/, '.journal-hero-inner h1[data-reveal]');

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Novidades' }).click();
  await expect(page).toHaveURL(/\/novidades$/);
  await expectRouteContent(page, /Acompanhe o que/);
  await page.goBack();
  await expect(page).toHaveURL(/\/journal$/);
  await expectRouteContent(page, /Elite Journal/, '.journal-hero-inner h1[data-reveal]');
  await page.goForward();
  await expect(page).toHaveURL(/\/novidades$/);
  await expectRouteContent(page, /Acompanhe o que/);

  expect(documentRequests).toHaveLength(1);
  expect(errors).toEqual([]);
});

test('hero da home mantém CTA principal visível nos quatro viewports aprovados', async ({ page }) => {
  await page.goto('/');
  for (const [width, height] of [[360, 800], [768, 1024], [1366, 768], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    const cta = page.getByRole('link', { name: 'Começar a reflexão' });
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});
