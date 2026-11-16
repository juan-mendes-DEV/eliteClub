import { expect, test, type Page } from '@playwright/test';

const preferredOptionByQuestion: Record<string, number> = {
  'public-approval': 2,
  comparison: 0,
  attention: 1,
  criticism: 2,
  'work-promise': 1,
  consumption: 1,
  'artificial-intelligence': 2,
  uncertainty: 0,
  'group-discussion': 1,
  constancy: 0,
};

async function answerAll(page: Page) {
  await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).click();
  for (let index = 0; index < 10; index += 1) {
    const questionId = await page.locator('.diagnostic-options input[type="radio"]').first().getAttribute('name');
    const optionIndex = preferredOptionByQuestion[questionId ?? ''] ?? 0;
    await page.getByRole('radio').nth(optionIndex).check();
    await page.getByRole('button', { name: index === 9 ? 'Revisar respostas' : 'Próxima pergunta' }).click();
  }
  await page.getByRole('button', { name: 'Montar meu plano de 7 dias' }).click();
}

test.describe('Diagnóstico Elite — dilemas estoicos contemporâneos', () => {
  test('navega por teclado, revisa respostas e cria sete práticas sem envio', async ({ page }) => {
    const submissions: string[] = [];
    page.on('request', (request) => { if (request.method() === 'POST') submissions.push(request.url()); });
    await page.goto('/diagnostico');
    await expect(page.getByRole('heading', { name: /Diagnóstico Elite.*reflexão estoica sobre suas escolhas/i })).toBeVisible();
    await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: /Pergunta 1 de 10/ })).toBeVisible();
    await expect(page.getByRole('group', { name: /Se seu trabalho recebesse pouca atenção nas redes/ })).toBeVisible();

    const radios = page.getByRole('radio');
    await radios.first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(radios.nth(1)).toBeChecked();
    await page.getByRole('button', { name: 'Próxima pergunta' }).focus();
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Pergunta anterior' }).click();
    await expect(radios.nth(1)).toBeChecked();

    // Complete remaining questions, retaining and revising the first answer.
    await page.getByRole('radio').nth(2).check();
    for (let index = 0; index < 10; index += 1) {
      const questionId = await page.locator('.diagnostic-options input[type="radio"]').first().getAttribute('name');
      if (!(await page.getByRole('radio', { checked: true }).count())) {
        await page.getByRole('radio').nth(preferredOptionByQuestion[questionId ?? ''] ?? 0).check();
      }
      await page.getByRole('button', { name: index === 9 ? 'Revisar respostas' : 'Próxima pergunta' }).click();
    }

    await expect(page.getByRole('heading', { name: 'Revise suas respostas' })).toBeVisible();
    await page.getByRole('button', { name: 'Editar resposta da pergunta 1', exact: true }).click();
    await page.getByRole('button', { name: 'Próxima pergunta' }).click();
    for (let index = 1; index < 10; index += 1) {
      await page.getByRole('button', { name: index === 9 ? 'Revisar respostas' : 'Próxima pergunta' }).click();
    }
    await page.getByRole('button', { name: 'Montar meu plano de 7 dias' }).click();
    await expect(page.getByRole('heading', { name: /Seu ponto de partida/ })).toBeVisible();
    await expect(page.locator('.diagnostic-day')).toHaveCount(7);
    await expect(page.getByRole('heading', { name: 'Atenção e julgamentos' })).toBeVisible();
    expect(submissions).toEqual([]);
  });

  test('reinicia e apaga as respostas que estavam em memória', async ({ page }) => {
    await page.goto('/diagnostico');
    await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).click();
    await page.getByRole('radio').nth(2).check();
    await page.getByRole('button', { name: 'Próxima pergunta' }).click();
    await page.getByRole('button', { name: 'Reiniciar' }).click();
    await expect(page.getByRole('heading', { name: /Diagnóstico Elite.*reflexão estoica/ })).toBeVisible();
    await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).click();
    await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: /Pergunta 1 de 10/ })).toBeVisible();
  });

  test('mantém controles nomeados, estado de progresso e teclado', async ({ page }) => {
    await page.goto('/diagnostico');
    await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).click();
    await expect(page.getByRole('group', { name: /Se seu trabalho recebesse pouca atenção nas redes/ })).toBeVisible();
    await expect(page.getByRole('progressbar', { name: 'Progresso do diagnóstico' })).toHaveAttribute('value', '1');
    await expect(page.getByRole('button', { name: 'Próxima pergunta' })).toBeDisabled();
    await page.getByRole('radio').first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('radio').nth(1)).toBeChecked();
  });

  test('respeita prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/diagnostico');
    await page.getByRole('button', { name: 'Iniciar diagnóstico gratuito' }).click();
    expect(await page.locator('.diagnostic-stage').evaluate((element) => getComputedStyle(element).animationDuration)).toBe('0s');
    await expect(page.getByRole('heading', { name: /Pergunta 1 de 10/ })).toBeVisible();
  });

  test('não há overflow em 360, 768 ou 1440 px e não aparecem erros no console', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/diagnostico');
    for (const [width, height] of [[360, 800], [768, 1024], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await expect(page.getByRole('heading', { name: /Diagnóstico Elite.*reflexão estoica/ })).toBeVisible();
      const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      expect(size.document).toBe(size.viewport);
    }
    expect(errors).toEqual([]);
  });

  test('aciona impressão local e mantém o plano visível na folha de impressão', async ({ page }) => {
    await page.goto('/diagnostico');
    await answerAll(page);
    await expect(page.locator('.diagnostic-day')).toHaveCount(7);
    await page.evaluate(() => { window.print = () => { document.documentElement.dataset.printInvoked = 'true'; }; });
    await page.getByRole('button', { name: 'Imprimir ou salvar como PDF' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-print-invoked', 'true');
    await page.emulateMedia({ media: 'print' });
    expect(await page.locator('.site-header').evaluate((element) => getComputedStyle(element).display)).toBe('none');
    expect(await page.locator('.diagnostic-day').first().evaluate((element) => getComputedStyle(element).display)).not.toBe('none');
  });
});
