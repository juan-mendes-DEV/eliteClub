import test from 'node:test';
import assert from 'node:assert/strict';

const { draftArticles, publishedArticles, estimateReadingTime } = await import(process.env.ELITE_JOURNAL_MODULE_PATH);

test('keeps the three approved-for-review articles unpublished', () => {
  assert.equal(draftArticles.length, 3);
  assert.deepEqual(publishedArticles, []);
  for (const article of draftArticles) {
    assert.equal(article.status, 'draft');
    assert.equal(article.publishedAt, null);
  }
});

test('drafts have complete editorial/SEO metadata and matching reading estimates', () => {
  for (const article of draftArticles) {
    assert.ok(article.title.trim());
    assert.ok(article.description.length <= 160, `${article.slug} description exceeds typical search snippet length`);
    assert.ok(article.summary);
    assert.ok(article.category);
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(article.readingTime, estimateReadingTime(article.content));
    assert.ok(article.coverSuggestion);
    assert.ok(article.internalLinks.length > 0);
    assert.equal(article.diagnosticCta.href === '/diagnostico' || article.slug === 'elegancia-nao-e-ostentacao-comportamento', true);
  }
});

test('provides the requested contextual CTAs and safe internal routes', () => {
  const bySlug = Object.fromEntries(draftArticles.map((article) => [article.slug, article]));
  assert.equal(bySlug['disciplina-base-verdadeira-liberdade'].diagnosticCta.label, 'Descubra quais hábitos você deseja fortalecer.');
  assert.equal(bySlug['elegancia-nao-e-ostentacao-comportamento'].diagnosticCta.label, 'Conheça os princípios The Elite Way.');
  assert.equal(bySlug['elegancia-nao-e-ostentacao-comportamento'].diagnosticCta.href, '/the-elite-way');
  assert.equal(bySlug['transformar-objetivos-em-habitos-consistentes'].diagnosticCta.label, 'Comece seu plano de evolução de sete dias.');
  for (const article of draftArticles) {
    for (const item of article.internalLinks) assert.ok(item.href.startsWith('/') && !item.href.startsWith('//'));
  }
});
