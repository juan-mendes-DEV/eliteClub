import { expect, test } from '@playwright/test';

test('Journal mantém os rascunhos fora da listagem e preserva rotas em mobile', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/journal');

  await expect(page.getByRole('heading', { name: 'Elite Journal.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Toda boa ideia merece tempo.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /disciplina como caminho/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /elegância não é ostentação/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /objetivos em hábitos consistentes/i })).toHaveCount(0);

  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(dimensions.document).toBe(dimensions.viewport);
  await page.getByRole('button', { name: 'MENU' }).click();
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Planner' }).click();
  await expect(page).toHaveURL(/\/planner$/);
  await page.goto('/diagnostico');
  await expect(page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('slugs de rascunhos não são servidos como artigos publicados', async ({ page }) => {
  const response = await page.goto('/journal/disciplina-base-verdadeira-liberdade');
  expect(response?.status()).toBe(404);
});
