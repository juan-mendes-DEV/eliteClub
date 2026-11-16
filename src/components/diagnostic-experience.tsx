'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Printer, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  createInitialDiagnosticFlow,
  diagnosticThemes,
  diagnosticFlowReducer,
  diagnosticQuestions,
} from '@/lib/diagnostic';

export default function DiagnosticExperience() {
  const [state, dispatch] = useReducer(diagnosticFlowReducer, undefined, createInitialDiagnosticFlow);
  const stageHeading = useRef<HTMLHeadingElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const previousPhase = useRef(state.phase);
  const question = diagnosticQuestions[state.questionIndex];
  const answerForCurrentQuestion = question ? state.answers[question.id] : undefined;
  const selectedOption = useMemo(
    () => question?.options.find((option) => option.id === answerForCurrentQuestion),
    [answerForCurrentQuestion, question],
  );

  useEffect(() => {
    if (state.phase === 'intro' && previousPhase.current !== 'intro') startButton.current?.focus();
    else if (state.phase !== 'intro') stageHeading.current?.focus();
    previousPhase.current = state.phase;
  }, [state.phase, state.questionIndex]);

  const restart = () => dispatch({ type: 'reset' });

  return <main className="diagnostic-page">
    <section className="diagnostic-hero" aria-labelledby="diagnostic-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="diagnostic-hero-inner">
        <p className="eyebrow">DIAGNÓSTICO ELITE · THE ELITE WAY</p>
        <h1 id="diagnostic-title">Diagnóstico Elite <em>— Uma reflexão estoica sobre suas escolhas</em></h1>
        <p>Examine dilemas atuais, reconheça o que está ao seu alcance e escolha um próximo passo possível.</p>
        {state.phase === 'intro' && <button ref={startButton} className="button button-gold diagnostic-start" type="button" onClick={() => dispatch({ type: 'start' })}>Iniciar diagnóstico gratuito <ArrowRight size={16} /></button>}
        <ul className="diagnostic-facts" aria-label="Sobre o diagnóstico">
          <li><Check size={14} aria-hidden="true" /><span>10 perguntas · cerca de 4–5 minutos</span></li>
          <li><Check size={14} aria-hidden="true" /><span>Sem cadastro</span></li>
          <li><Check size={14} aria-hidden="true" /><span>Respostas não são enviadas ao servidor</span></li>
        </ul>
      </div>
      <span className="diagnostic-hero-index">ELITE CLUB · EVOLUÇÃO COM INTENÇÃO</span>
    </section>

    <div className="diagnostic-disclaimer" role="note"><Sparkles size={17} strokeWidth={1.4} aria-hidden="true" /><p>Esta é uma reflexão orientativa, não uma nota de virtude, perfil pessoal ou avaliação psicológica. Os temas sugeridos vêm das opções escolhidas; você decide o que faz sentido levar para a prática.</p></div>

    {state.phase === 'questions' && question && <section className="diagnostic-workspace" id="questionario" aria-label="Questionário do Diagnóstico Elite">
      <div className="diagnostic-workspace-top"><span>SEU PONTO DE PARTIDA</span><button type="button" className="diagnostic-reset-link" onClick={restart}><RotateCcw size={13} />Reiniciar</button></div>
      <div className="diagnostic-progress-row"><span aria-live="polite">Pergunta {state.questionIndex + 1} <span aria-hidden="true">/</span> {diagnosticQuestions.length}</span><span>{Math.round(((state.questionIndex + 1) / diagnosticQuestions.length) * 100)}%</span></div>
      <progress className="diagnostic-progress" value={state.questionIndex + 1} max={diagnosticQuestions.length} aria-label="Progresso do diagnóstico" />
      <div className="diagnostic-stage" key={question.id} data-question-index={state.questionIndex}>
        <p className="diagnostic-area-kicker">{diagnosticThemes.find((theme) => theme.id === question.theme)?.title}</p>
        <h2 ref={stageHeading} tabIndex={-1}>Pergunta <span>{state.questionIndex + 1} de {diagnosticQuestions.length}</span></h2>
        <fieldset className="diagnostic-options">
          <legend>{question.prompt}</legend>
          {question.options.map((option, index) => <label className={`diagnostic-option${selectedOption?.id === option.id ? ' is-selected' : ''}`} key={option.id}>
            <input type="radio" name={question.id} value={option.id} checked={selectedOption?.id === option.id} onChange={() => dispatch({ type: 'select', questionId: question.id, optionId: option.id })} />
            <span className="diagnostic-option-index">0{index + 1}</span>
            <span>{option.label}</span>
            <Check size={16} aria-hidden="true" />
          </label>)}
        </fieldset>
      </div>
      <div className="diagnostic-controls">
        <button type="button" className="diagnostic-back" onClick={() => dispatch({ type: 'back' })}><ArrowLeft size={15} />{state.questionIndex === 0 ? 'Voltar para apresentação' : 'Pergunta anterior'}</button>
        <button type="button" className="button button-gold" disabled={!selectedOption} onClick={() => dispatch({ type: 'next' })}>{state.questionIndex === diagnosticQuestions.length - 1 ? 'Revisar respostas' : 'Próxima pergunta'} <ArrowRight size={15} /></button>
      </div>
      <p className="diagnostic-local-note">Suas respostas ficam apenas nesta página e desaparecem ao reiniciar ou sair.</p>
    </section>}

    {state.phase === 'review' && <section className="diagnostic-workspace diagnostic-review" aria-labelledby="diagnostic-review-title">
      <div className="diagnostic-workspace-top"><span>ÚLTIMA ETAPA</span><button type="button" className="diagnostic-reset-link" onClick={restart}><RotateCcw size={13} />Reiniciar</button></div>
      <div className="diagnostic-progress-row"><span>Revisão</span><span>10 / 10</span></div>
      <progress className="diagnostic-progress" value={10} max={10} aria-label="Progresso do diagnóstico" />
      <h2 ref={stageHeading} tabIndex={-1} id="diagnostic-review-title">Revise suas respostas</h2>
      <p className="diagnostic-review-lede">Você pode voltar a qualquer pergunta antes de montar seu plano.</p>
      <ol className="diagnostic-review-list">{diagnosticQuestions.map((item, index) => {
        const answer = item.options.find((option) => option.id === state.answers[item.id]);
        return <li key={item.id}><div><span className="diagnostic-area-kicker">{item.prompt}</span><p>{answer?.label}</p></div><button type="button" aria-label={`Editar resposta da pergunta ${index + 1}`} onClick={() => dispatch({ type: 'edit', questionId: item.id })}>Editar</button></li>;
      })}</ol>
      <div className="diagnostic-controls"><button type="button" className="diagnostic-back" onClick={() => dispatch({ type: 'back' })}><ArrowLeft size={15} />Voltar à última pergunta</button><button type="button" className="button button-gold" onClick={() => dispatch({ type: 'complete' })}>Montar meu plano de 7 dias <ArrowRight size={15} /></button></div>
      <p className="diagnostic-local-note">Nenhuma resposta será transmitida ou guardada neste dispositivo.</p>
    </section>}

    {state.phase === 'result' && state.result && <section className="diagnostic-result" aria-labelledby="diagnostic-result-title">
      <div className="diagnostic-result-heading"><p className="eyebrow">UM PLANO INICIAL · SETE DIAS</p><h2 ref={stageHeading} tabIndex={-1} id="diagnostic-result-title">Seu ponto de <em>partida.</em></h2><p>Uma leitura prática das prioridades que você escolheu — para experimentar no seu ritmo.</p></div>

      {state.result.priorities.length > 0 ? <section className="diagnostic-priorities" aria-labelledby="diagnostic-priorities-title"><div className="diagnostic-subheading"><span>01</span><h3 id="diagnostic-priorities-title">Temas para examinar</h3></div><p className="diagnostic-plan-note">Estes temas apareceram nas opções que você escolheu. A ordem é editorial, não representa nota ou classificação.</p><div className="diagnostic-priority-grid">{state.result.priorities.map((priority) => <article className="diagnostic-priority-card" key={priority.theme}><span className="diagnostic-priority-number">TEMA DE REFLEXÃO</span><h4>{priority.title}</h4><p>{priority.description}</p><div className="diagnostic-focus-points"><span>ESCOLHAS QUE SINALIZARAM ESTE TEMA</span>{priority.selectedReflections.map((point) => <p key={point.question}><strong>{point.question}</strong>{point.answer}</p>)}</div></article>)}</div></section> : <div className="diagnostic-no-priority" role="note"><h3>Nenhum tema específico se destacou pelas escolhas.</h3><p>Isso também é válido. O plano geral abaixo oferece práticas para observar julgamentos, decisões e ações possíveis no cotidiano.</p></div>}

      <section className="diagnostic-plan" aria-labelledby="diagnostic-plan-title"><div className="diagnostic-subheading"><span>02</span><h3 id="diagnostic-plan-title">Sete práticas para a semana</h3></div><p className="diagnostic-plan-note">Cada dia propõe uma prática concreta, não uma obrigação. Adapte-a à sua realidade; as escolhas não garantem resultados e não medem seu caráter.</p><ol className="diagnostic-plan-list">{state.result.plan.map((day) => <li className="diagnostic-day" key={day.day}><span className="diagnostic-day-number">DIA {String(day.day).padStart(2, '0')}</span><div><h4>{day.title}</h4><p>{day.detail}</p>{day.theme && <span className="diagnostic-day-area">{diagnosticThemes.find((theme) => theme.id === day.theme)?.title}</span>}</div></li>)}</ol></section>

      <section className="diagnostic-context" aria-labelledby="diagnostic-context-title"><p className="eyebrow">SIGA EXPLORANDO</p><h3 id="diagnostic-context-title">Princípios e ferramentas em construção.</h3><div className="diagnostic-context-links"><Link href="/the-elite-way">The Elite Way <ArrowUpRight size={14} /></Link><Link href="/academy">Elite Academy <span>Em planejamento</span><ArrowUpRight size={14} /></Link><Link href="/planner">Elite Planner <span>Em planejamento</span><ArrowUpRight size={14} /></Link><Link href="/mind-ai">Elite Mind AI <span>Em planejamento</span><ArrowUpRight size={14} /></Link></div><p>O Diagnóstico Elite é uma experiência orientativa, não é um produto de IA. Academy, Planner e Mind AI permanecem em planejamento.</p></section>

      <div className="diagnostic-result-actions"><button type="button" className="button button-gold" onClick={() => window.print()}><Printer size={15} />Imprimir ou salvar como PDF</button><button type="button" className="diagnostic-back" onClick={restart}><RotateCcw size={15} />Refazer diagnóstico</button></div>
      <p className="diagnostic-local-note">Impressão gerada pelo navegador. Seu resultado não é enviado a outro serviço. Ao refazer, as respostas atuais são limpas.</p>
    </section>}

    {state.phase === 'intro' && <section className="diagnostic-intro-note" aria-labelledby="diagnostic-how-title"><p className="eyebrow">UMA REFLEXÃO BREVE · SEM NOTAS</p><h2 id="diagnostic-how-title">Feito para refletir.<br /><em>Sem rótulos.</em></h2><p>Os dilemas aproximam princípios estoicos de situações atuais. As opções não são um teste de virtude: ajudam a perceber o que você gostaria de examinar, sem perfil psicológico ou avaliação científica.</p><ul><li>Reflita sobre dez situações de trabalho, relações, redes e escolhas cotidianas.</li><li>Revise e, se quiser, altere qualquer resposta.</li><li>Receba temas para examinar e sete práticas gratuitas, uma por dia.</li></ul></section>}
  </main>;
}
