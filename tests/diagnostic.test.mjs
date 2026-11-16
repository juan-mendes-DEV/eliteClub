import test from 'node:test';
import assert from 'node:assert/strict';

const { buildDiagnosticResult, diagnosticQuestions, diagnosticThemes } = await import(process.env.ELITE_DIAGNOSTIC_MODULE_PATH);

function answersWithoutFocus() {
  return Object.fromEntries(diagnosticQuestions.map((question) => [
    question.id,
    question.options.find((option) => !option.signalsFocus).id,
  ]));
}

function setFocus(answers, questionId) {
  const question = diagnosticQuestions.find((item) => item.id === questionId);
  answers[questionId] = question.options.find((option) => option.signalsFocus).id;
  return answers;
}

test('returns incomplete when any answer is missing or invalid', () => {
  const result = buildDiagnosticResult({ 'public-approval': 'invalid' });
  assert.equal(result.status, 'incomplete');
  assert.equal(result.missingQuestions.length, 10);
  assert.ok(result.missingQuestions.includes('public-approval'));
});

test('answers without a focus signal receive a general seven-day reflection plan', () => {
  const result = buildDiagnosticResult(answersWithoutFocus());
  assert.equal(result.status, 'complete');
  if (result.status !== 'complete') return;
  assert.deepEqual(result.priorities, []);
  assert.deepEqual(result.plan.map((day) => day.day), [1, 2, 3, 4, 5, 6, 7]);
  assert.ok(result.plan.every((day) => day.title && day.detail));
});

test('selects a single focus theme and interleaves concrete general practices', () => {
  const answers = setFocus(answersWithoutFocus(), 'criticism');
  const result = buildDiagnosticResult(answers);
  assert.equal(result.status, 'complete');
  if (result.status !== 'complete') return;
  assert.deepEqual(result.priorities.map((priority) => priority.theme), ['attention-judgments']);
  assert.deepEqual(result.plan.map((day) => day.day), [1, 2, 3, 4, 5, 6, 7]);
  assert.match(result.plan[0].title, /fato, interpretação e resposta/i);
  assert.equal(result.plan[0].theme, 'attention-judgments');
});

test('ties resolve by fixed editorial order and output never exceeds two themes', () => {
  const answers = setFocus(setFocus(answersWithoutFocus(), 'public-approval'), 'consumption');
  const result = buildDiagnosticResult(answers);
  assert.equal(result.status, 'complete');
  if (result.status !== 'complete') return;
  assert.deepEqual(result.priorities.map((priority) => priority.theme), ['attention-judgments', 'moderation']);
  assert.equal(result.priorities.length, 2);
  assert.deepEqual(result.plan.map((day) => day.day), [1, 2, 3, 4, 5, 6, 7]);
  assert.match(result.plan[0].title, /trabalho bom/i);
  assert.match(result.plan[1].title, /valor sem plateia/i);
  assert.match(result.plan[3].detail, /prazer que espera/i);
  assert.match(result.plan[5].detail, /compra não for urgente/i);
});

test('multiple focus signals select the two most-mentioned themes in editorial display order', () => {
  const answers = answersWithoutFocus();
  setFocus(answers, 'public-approval');
  setFocus(answers, 'comparison');
  setFocus(answers, 'attention');
  setFocus(answers, 'uncertainty');
  setFocus(answers, 'constancy');
  setFocus(answers, 'consumption');
  const result = buildDiagnosticResult(answers);
  assert.equal(result.status, 'complete');
  if (result.status !== 'complete') return;
  assert.deepEqual(result.priorities.map((priority) => priority.theme), ['attention-judgments', 'uncertainty-action']);
  assert.equal(result.plan.length, 7);
});

test('all ten current dilemmas exist and belong to the four requested themes', () => {
  assert.equal(diagnosticQuestions.length, 10);
  assert.deepEqual(diagnosticThemes.map((theme) => theme.id), [
    'attention-judgments', 'uncertainty-action', 'integrity-coexistence', 'moderation',
  ]);
  for (const question of diagnosticQuestions) {
    assert.ok(question.prompt.length > 40);
    assert.ok(question.options.some((option) => option.label.startsWith('Ainda não sei')));
    assert.ok(question.options.length >= 4);
  }
});

test('same answers deterministically generate the same themes and daily practices', () => {
  const answers = setFocus(setFocus(answersWithoutFocus(), 'work-promise'), 'artificial-intelligence');
  assert.deepEqual(buildDiagnosticResult(answers), buildDiagnosticResult(answers));
});
