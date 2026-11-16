import test from 'node:test';
import assert from 'node:assert/strict';
const {
  createInitialDiagnosticFlow,
  diagnosticFlowReducer,
  diagnosticQuestions,
} = await import(process.env.ELITE_DIAGNOSTIC_MODULE_PATH);

function answerAll() {
  let state = diagnosticFlowReducer(createInitialDiagnosticFlow(), { type: 'start' });
  for (const question of diagnosticQuestions) {
    state = diagnosticFlowReducer(state, { type: 'select', questionId: question.id, optionId: question.options.find((option) => option.signalsFocus).id });
    state = diagnosticFlowReducer(state, { type: 'next' });
  }
  return state;
}

test('cannot advance from an unanswered question; back keeps the selected response', () => {
  let state = diagnosticFlowReducer(createInitialDiagnosticFlow(), { type: 'start' });
  assert.equal(diagnosticFlowReducer(state, { type: 'next' }), state);
  state = diagnosticFlowReducer(state, { type: 'select', questionId: diagnosticQuestions[0].id, optionId: diagnosticQuestions[0].options[1].id });
  state = diagnosticFlowReducer(state, { type: 'next' });
  state = diagnosticFlowReducer(state, { type: 'back' });
  assert.equal(state.questionIndex, 0);
  assert.equal(state.answers[diagnosticQuestions[0].id], diagnosticQuestions[0].options[1].id);
});

test('reaches review after exactly ten questions and can edit a prior response', () => {
  let state = answerAll();
  assert.equal(state.phase, 'review');
  state = diagnosticFlowReducer(state, { type: 'edit', questionId: 'public-approval' });
  assert.equal(state.phase, 'questions');
  assert.equal(state.questionIndex, 0);
  state = diagnosticFlowReducer(state, { type: 'select', questionId: 'public-approval', optionId: 'quality-and-care' });
  state = diagnosticFlowReducer(state, { type: 'next' });
  assert.equal(state.questionIndex, 1);
});

test('review can return to the last question and complete the assessment', () => {
  let state = answerAll();
  state = diagnosticFlowReducer(state, { type: 'back' });
  assert.equal(state.phase, 'questions');
  assert.equal(state.questionIndex, diagnosticQuestions.length - 1);
  state = diagnosticFlowReducer(state, { type: 'next' });
  state = diagnosticFlowReducer(state, { type: 'complete' });
  assert.equal(state.phase, 'result');
  assert.equal(state.result?.plan.length, 7);
});

test('restart clears every answer and result', () => {
  let state = answerAll();
  state = diagnosticFlowReducer(state, { type: 'complete' });
  assert.equal(state.phase, 'result');
  state = diagnosticFlowReducer(state, { type: 'reset' });
  assert.deepEqual(state, createInitialDiagnosticFlow());
});
