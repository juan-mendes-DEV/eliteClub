export const diagnosticThemes = [
  {
    id: 'attention-judgments',
    title: 'Atenção e julgamentos',
    description: 'Observar o que está sob seu critério — atenção, interpretação e resposta — sem confundir isso com controle sobre a reação alheia.',
  },
  {
    id: 'uncertainty-action',
    title: 'Ação sob incerteza',
    description: 'Distinguir o que pode ser influenciado do que depende de outras pessoas ou circunstâncias, e escolher um próximo passo possível.',
  },
  {
    id: 'integrity-coexistence',
    title: 'Integridade e convivência',
    description: 'Considerar compromissos, relações e consequências ao decidir como agir com outras pessoas.',
  },
  {
    id: 'moderation',
    title: 'Moderação',
    description: 'Examinar desejos, consumo e impulsos sem transformar escolhas cotidianas em culpa ou regra universal.',
  },
] as const;

export type DiagnosticThemeId = (typeof diagnosticThemes)[number]['id'];
export type DiagnosticQuestionId =
  | 'public-approval'
  | 'comparison'
  | 'attention'
  | 'criticism'
  | 'work-promise'
  | 'consumption'
  | 'artificial-intelligence'
  | 'uncertainty'
  | 'group-discussion'
  | 'constancy';

export interface DiagnosticOption {
  id: string;
  label: string;
  /** Editorial signal that this selected answer is a topic the visitor wants to examine. */
  signalsFocus: boolean;
}

export interface DiagnosticQuestion {
  id: DiagnosticQuestionId;
  theme: DiagnosticThemeId;
  prompt: string;
  options: readonly DiagnosticOption[];
}

export const diagnosticQuestions: readonly DiagnosticQuestion[] = [
  {
    id: 'public-approval',
    theme: 'attention-judgments',
    prompt: 'Se seu trabalho recebesse pouca atenção nas redes, o que ainda faria você considerá-lo bom?',
    options: [
      { id: 'quality-and-care', label: 'Eu ainda avaliaria o cuidado, a clareza e a utilidade do que fiz.', signalsFocus: false },
      { id: 'audience-feedback', label: 'Eu consideraria o retorno das pessoas, sem tratá-lo como critério único.', signalsFocus: false },
      { id: 'attention-weight', label: 'Eu notaria que a atenção pública ainda pesa no meu julgamento.', signalsFocus: true },
      { id: 'build-a-criterion', label: 'Ainda não sei; gostaria de construir um critério próprio.', signalsFocus: true },
    ],
  },
  {
    id: 'comparison',
    theme: 'attention-judgments',
    prompt: 'Ao ver alguém da sua idade avançar mais rápido, o que você está comparando: esforço, circunstâncias ou só o resultado visível?',
    options: [
      { id: 'compare-context', label: 'Tentaria separar esforço, circunstâncias e resultado antes de concluir.', signalsFocus: false },
      { id: 'visible-result', label: 'Perceberia que estou comparando resultados sem conhecer todo o percurso.', signalsFocus: true },
      { id: 'use-as-reference', label: 'Usaria o caso como referência, lembrando que os contextos podem ser diferentes.', signalsFocus: false },
      { id: 'still-unclear-comparison', label: 'Ainda não sei; quero observar o que essa comparação deixa de fora.', signalsFocus: true },
    ],
  },
  {
    id: 'attention',
    theme: 'attention-judgments',
    prompt: 'Quando sua mão vai para o celular sem você ter decidido, a que você gostaria de dar atenção naquele momento?',
    options: [
      { id: 'purposeful-check', label: 'Eu verificaria se havia uma razão concreta para pegar o celular.', signalsFocus: false },
      { id: 'notice-the-habit', label: 'Eu gostaria de perceber o que acionou o gesto automático.', signalsFocus: true },
      { id: 'choose-the-next-thing', label: 'Eu escolheria conscientemente entre continuar ou voltar ao que fazia.', signalsFocus: false },
      { id: 'observe-next-time', label: 'Ainda não sei; quero notar o que estava acontecendo da próxima vez.', signalsFocus: true },
    ],
  },
  {
    id: 'criticism',
    theme: 'attention-judgments',
    prompt: 'Quando alguém critica você injustamente, o que merece ser corrigido: o fato, a relação ou a interpretação que você fez?',
    options: [
      { id: 'clarify-the-fact', label: 'Eu pediria um exemplo concreto para entender o que está sendo apontado.', signalsFocus: false },
      { id: 'consider-the-relationship', label: 'Eu consideraria o contexto e a relação antes de decidir como responder.', signalsFocus: false },
      { id: 'separate-event-and-reading', label: 'Eu separaria o que aconteceu da interpretação que fiz e escolheria uma resposta.', signalsFocus: true },
      { id: 'pause-before-concluding', label: 'Ainda não sei; quero esclarecer o fato antes de tirar uma conclusão.', signalsFocus: true },
    ],
  },
  {
    id: 'work-promise',
    theme: 'integrity-coexistence',
    prompt: 'Se prometer mais do que consegue entregar ajudasse a fechar um negócio, qual compromisso você faria com o cliente?',
    options: [
      { id: 'realistic-scope', label: 'Prometeria o escopo e o prazo que considero viáveis, deixando claras as condições.', signalsFocus: false },
      { id: 'offer-alternatives', label: 'Apresentaria opções de prazo ou escopo para o cliente escolher.', signalsFocus: false },
      { id: 'state-uncertainty', label: 'Explicaria o que ainda precisa de confirmação antes de assumir um prazo.', signalsFocus: false },
      { id: 'examine-the-pressure', label: 'Ainda não sei; quero pensar no equilíbrio entre transparência e chance de fechar.', signalsFocus: true },
    ],
  },
  {
    id: 'consumption',
    theme: 'moderation',
    prompt: 'Você ainda desejaria a mesma compra se ninguém pudesse ver que ela é sua? O que a tornaria valiosa mesmo assim?',
    options: [
      { id: 'use-and-need', label: 'Eu pensaria no uso que teria e em como se encaixa nas minhas necessidades.', signalsFocus: false },
      { id: 'pleasure-and-budget', label: 'Prazer e estética também contam; eu os colocaria junto do custo e do uso.', signalsFocus: false },
      { id: 'visibility-matters', label: 'Eu notaria que ser visto com o objeto faz parte do que desejo.', signalsFocus: true },
      { id: 'wait-and-review', label: 'Ainda não sei; esperaria um pouco e reveria o desejo, o uso e o custo.', signalsFocus: true },
    ],
  },
  {
    id: 'artificial-intelligence',
    theme: 'integrity-coexistence',
    prompt: 'Se uma IA pudesse escrever uma mensagem difícil por você, que parte da reflexão e da decisão você manteria?',
    options: [
      { id: 'decide-and-review', label: 'Eu definiria a intenção e revisaria cada palavra antes de decidir se envio.', signalsFocus: false },
      { id: 'organize-my-thoughts', label: 'Eu poderia pedir ajuda para organizar ideias, mantendo minha decisão e meu tom.', signalsFocus: false },
      { id: 'reflect-on-boundaries', label: 'Eu gostaria de examinar o que não quero terceirizar numa conversa importante.', signalsFocus: true },
      { id: 'depends-on-context', label: 'Ainda não sei; a sensibilidade e as consequências da mensagem fariam diferença.', signalsFocus: true },
    ],
  },
  {
    id: 'uncertainty',
    theme: 'uncertainty-action',
    prompt: 'Se um projeto dependesse de uma resposta que talvez nunca chegue, qual decisão útil ainda estaria ao seu alcance?',
    options: [
      { id: 'take-independent-step', label: 'Eu escolheria um próximo passo que não dependa daquela resposta.', signalsFocus: false },
      { id: 'set-a-checkpoint', label: 'Eu definiria um momento para rever o plano e prepararia uma alternativa.', signalsFocus: false },
      { id: 'notice-the-wait', label: 'Eu perceberia que estou deixando o projeto parado enquanto aguardo.', signalsFocus: true },
      { id: 'map-what-remains', label: 'Ainda não sei; começaria listando o que pode ser decidido sem a resposta.', signalsFocus: true },
    ],
  },
  {
    id: 'group-discussion',
    theme: 'integrity-coexistence',
    prompt: 'Numa discussão em grupo, como você decidiria entre corrigir uma informação, defender alguém ou sair da discussão?',
    options: [
      { id: 'correct-with-context', label: 'Eu avaliaria a importância do erro e, se necessário, corrigiria com contexto.', signalsFocus: false },
      { id: 'support-the-person', label: 'Eu verificaria se alguém precisa de apoio e como oferecê-lo sem aumentar o conflito.', signalsFocus: false },
      { id: 'leave-when-unhelpful', label: 'Eu consideraria sair se a conversa já não permitisse uma troca construtiva.', signalsFocus: false },
      { id: 'weigh-the-options', label: 'Ainda não sei; quero pesar precisão, apoio e minha capacidade de contribuir.', signalsFocus: true },
    ],
  },
  {
    id: 'constancy',
    theme: 'uncertainty-action',
    prompt: 'Depois de quebrar um compromisso consigo mesmo, o que precisa ser revisto: a meta, o método ou o próximo passo?',
    options: [
      { id: 'adjust-the-next-step', label: 'Eu escolheria um próximo passo menor e retomaria sem tentar compensar tudo.', signalsFocus: false },
      { id: 'review-the-method', label: 'Eu verificaria se o método e o momento ainda combinam com a minha rotina.', signalsFocus: false },
      { id: 'notice-the-pattern', label: 'Eu gostaria de entender o que se repete antes de definir uma nova tentativa.', signalsFocus: true },
      { id: 'start-with-observation', label: 'Ainda não sei; começaria observando o que tornou o compromisso difícil.', signalsFocus: true },
    ],
  },
];

export type DiagnosticAnswers = Partial<Record<DiagnosticQuestionId, string>>;

interface Activity {
  title: string;
  detail: string;
}

const activityLibraryByQuestion: Record<DiagnosticQuestionId, readonly Activity[]> = {
  'public-approval': [
    { title: 'Defina o que torna seu trabalho bom', detail: 'Escolha um trabalho recente e anote dois critérios de qualidade ou utilidade que continuariam importantes mesmo com pouca atenção pública.' },
    { title: 'Compare intenção e resultado', detail: 'Releia uma publicação ou entrega e observe se ela expressa o que você pretendia comunicar, independentemente do alcance.' },
    { title: 'Escolha um retorno que ajude', detail: 'Se quiser feedback, escolha uma pessoa ou pergunta específica que possa informar uma melhoria sem transformar aprovação em medida única.' },
  ],
  comparison: [
    { title: 'Separe resultado visível de contexto', detail: 'Anote o resultado que chamou sua atenção e duas circunstâncias do percurso daquela pessoa que você não conhece.' },
    { title: 'Escolha uma comparação útil', detail: 'Compare uma ação sua atual com uma tentativa passada e identifique algo que aprendeu, sem presumir que os contextos são iguais.' },
    { title: 'Transforme comparação em pergunta', detail: 'Em vez de concluir quem avançou melhor, escreva uma habilidade ou informação que você gostaria de desenvolver.' },
  ],
  attention: [
    { title: 'Observe o gesto automático', detail: 'Na próxima vez que pegar o celular sem decidir, anote o que acontecia e o que chamou sua atenção.' },
    { title: 'Escolha uma intenção antes de abrir', detail: 'Antes de desbloquear o celular, nomeie o que quer fazer; ao terminar, decida se continua ou volta à tarefa anterior.' },
    { title: 'Proteja dez minutos de atenção', detail: 'Escolha uma atividade breve e coloque o celular fora do alcance durante esses dez minutos, se isso for viável para você.' },
  ],
  criticism: [
    { title: 'Separe fato, interpretação e resposta', detail: 'Antes de responder a uma crítica, escreva em privado o fato observável, a interpretação que você fez e a resposta que escolhe dar.' },
    { title: 'Decida o que merece esclarecimento', detail: 'Escolha um ponto concreto da crítica e formule uma pergunta que ajude a distinguir informação útil de uma conclusão sobre você.' },
    { title: 'Prepare uma resposta proporcional', detail: 'Escreva uma resposta que corrija o que for necessário e preserve a relação quando isso fizer sentido para você.' },
  ],
  'work-promise': [
    { title: 'Delimite uma entrega possível', detail: 'Para um compromisso de trabalho, anote o que está incluído, um prazo viável e as condições que ainda precisam de confirmação.' },
    { title: 'Ofereça opções transparentes', detail: 'Escreva duas alternativas reais de escopo ou prazo que poderia apresentar a um cliente, sem prometer o que não sabe cumprir.' },
    { title: 'Comunique uma incerteza', detail: 'Prepare uma frase curta para informar o que ainda não pode garantir e quando poderá atualizar a outra pessoa.' },
  ],
  consumption: [
    { title: 'Descreva o valor sem plateia', detail: 'Pense numa compra desejada e anote o que teria valor nela para você mesmo que ninguém soubesse que ela é sua.' },
    { title: 'Verifique uso, prazer e custo', detail: 'Considere como usaria o objeto, o prazer que espera dele e o custo dentro da sua realidade; não é preciso eliminar nenhum desses critérios.' },
    { title: 'Crie uma pausa para decidir', detail: 'Se a compra não for urgente, escolha um momento para revê-la e observe se o desejo e a justificativa continuam presentes.' },
  ],
  'artificial-intelligence': [
    { title: 'Escreva primeiro a sua intenção', detail: 'Antes de pedir ajuda para redigir uma mensagem difícil, anote com suas palavras o que precisa comunicar e por quê.' },
    { title: 'Revise autoria e tom', detail: 'Se usar uma ferramenta para organizar um rascunho, confira se cada frase representa sua decisão, seu tom e os fatos que conhece.' },
    { title: 'Escolha o que não terceirizar', detail: 'Identifique uma decisão da conversa — o momento de enviar, o limite que quer expressar ou o pedido que fará — que deseja manter como sua.' },
  ],
  uncertainty: [
    { title: 'Separe influência de dependência', detail: 'Para um projeto à espera de resposta, anote o que você decide, o que pode influenciar e o que depende da outra parte.' },
    { title: 'Avance sem presumir a resposta', detail: 'Escolha uma tarefa útil que possa fazer agora e que continue válida qualquer que seja a resposta recebida.' },
    { title: 'Defina revisão e alternativa', detail: 'Escolha quando rever o plano e escreva uma alternativa razoável caso a resposta não chegue até lá.' },
  ],
  'group-discussion': [
    { title: 'Identifique o que está em jogo', detail: 'Numa discussão recente, anote se o ponto mais importante era corrigir uma informação, apoiar alguém ou encerrar a troca.' },
    { title: 'Prepare uma intervenção breve', detail: 'Escreva uma frase respeitosa para corrigir um fato ou oferecer apoio, caso decida que intervir seria útil.' },
    { title: 'Defina um limite para participar', detail: 'Pense em um sinal de que a conversa deixou de ser construtiva e escolha como faria uma pausa ou sairia dela.' },
  ],
  constancy: [
    { title: 'Revise meta, método e próximo passo', detail: 'Depois de um compromisso interrompido, anote qual dos três precisa de ajuste e por quê, sem transformar a pausa em julgamento pessoal.' },
    { title: 'Encontre o ponto de atrito', detail: 'Pense no momento em que o plano ficou difícil e escolha uma mudança pequena de horário, ambiente ou preparação.' },
    { title: 'Marque uma retomada possível', detail: 'Defina uma ação curta e um momento concreto para retomá-la; evite tentar compensar de uma vez tudo o que não fez.' },
  ],
};

const generalWeekActivities: readonly Activity[] = [
  { title: 'Separe um fato de uma interpretação', detail: 'Escolha uma situação recente e escreva o que uma câmera teria registrado e o que você concluiu a partir disso.' },
  { title: 'Escolha onde colocar atenção', detail: 'Reserve dez minutos para uma tarefa e decida antes se o celular precisa estar ao alcance.' },
  { title: 'Faça um compromisso possível', detail: 'Anote uma entrega ou tarefa e descreva o próximo passo, o prazo e qualquer condição ainda incerta.' },
  { title: 'Aja sem controlar a resposta', detail: 'Escolha uma ação útil que depende de você, mesmo que a reação de outra pessoa ainda seja desconhecida.' },
  { title: 'Examine um desejo de consumo', detail: 'Pense no uso, no custo e no valor pessoal de algo que deseja, sem precisar decidir hoje.' },
  { title: 'Escolha como participar de uma conversa', detail: 'Numa troca cotidiana, observe se é mais útil esclarecer, escutar, apoiar alguém ou fazer uma pausa.' },
];

export interface DiagnosticPriority {
  theme: DiagnosticThemeId;
  title: string;
  description: string;
  selectedReflections: { questionId: DiagnosticQuestionId; question: string; answer: string }[];
}

export interface DiagnosticDay {
  day: number;
  title: string;
  detail: string;
  theme?: DiagnosticThemeId;
}

export type DiagnosticResult =
  | { status: 'incomplete'; missingQuestions: DiagnosticQuestionId[] }
  | { status: 'complete'; priorities: DiagnosticPriority[]; plan: DiagnosticDay[] };

export type DiagnosticPhase = 'intro' | 'questions' | 'review' | 'result';

export interface DiagnosticFlowState {
  phase: DiagnosticPhase;
  questionIndex: number;
  answers: DiagnosticAnswers;
  result?: Extract<DiagnosticResult, { status: 'complete' }>;
}

export type DiagnosticFlowAction =
  | { type: 'start' }
  | { type: 'select'; questionId: DiagnosticQuestionId; optionId: string }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'edit'; questionId: DiagnosticQuestionId }
  | { type: 'complete' }
  | { type: 'reset' };

export function createInitialDiagnosticFlow(): DiagnosticFlowState {
  return { phase: 'intro', questionIndex: 0, answers: {} };
}

/** Pure reducer keeps every response in page memory and makes flow testable. */
export function diagnosticFlowReducer(state: DiagnosticFlowState, action: DiagnosticFlowAction): DiagnosticFlowState {
  if (action.type === 'reset') return createInitialDiagnosticFlow();
  if (action.type === 'start' && state.phase === 'intro') return { ...state, phase: 'questions' };

  if (action.type === 'select' && state.phase === 'questions') {
    const question = diagnosticQuestions.find((item) => item.id === action.questionId);
    if (!question?.options.some((option) => option.id === action.optionId)) return state;
    return { ...state, answers: { ...state.answers, [action.questionId]: action.optionId } };
  }

  if (action.type === 'next' && state.phase === 'questions') {
    const question = diagnosticQuestions[state.questionIndex];
    if (!question.options.some((option) => option.id === state.answers[question.id])) return state;
    if (state.questionIndex === diagnosticQuestions.length - 1) return { ...state, phase: 'review' };
    return { ...state, questionIndex: state.questionIndex + 1 };
  }

  if (action.type === 'back' && state.phase === 'questions') {
    if (state.questionIndex === 0) return { ...state, phase: 'intro' };
    return { ...state, questionIndex: state.questionIndex - 1 };
  }

  if (action.type === 'back' && state.phase === 'review') {
    return { ...state, phase: 'questions', questionIndex: diagnosticQuestions.length - 1 };
  }

  if (action.type === 'edit' && state.phase === 'review') {
    const questionIndex = diagnosticQuestions.findIndex((question) => question.id === action.questionId);
    if (questionIndex < 0) return state;
    return { ...state, phase: 'questions', questionIndex };
  }

  if (action.type === 'complete' && state.phase === 'review') {
    const result = buildDiagnosticResult(state.answers);
    if (result.status === 'incomplete') {
      return { ...state, phase: 'questions', questionIndex: diagnosticQuestions.findIndex((question) => question.id === result.missingQuestions[0]) };
    }
    return { ...state, phase: 'result', result };
  }

  return state;
}

/**
 * Editorial mapping, not a virtue grade or personality assessment: an answer
 * tagged as a topic to examine signals one focus for its theme. Themes with
 * most signals are selected (up to two); ties follow the fixed theme order.
 * The output is then displayed in editorial order without numeric scores.
 */
export function buildDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
  const selected = new Map<DiagnosticQuestionId, DiagnosticOption>();
  const missingQuestions: DiagnosticQuestionId[] = [];

  for (const question of diagnosticQuestions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (option) selected.set(question.id, option);
    else missingQuestions.push(question.id);
  }

  if (missingQuestions.length > 0) return { status: 'incomplete', missingQuestions };

  const themeCounts = new Map<DiagnosticThemeId, number>(diagnosticThemes.map((theme) => [theme.id, 0]));
  for (const question of diagnosticQuestions) {
    if (selected.get(question.id)?.signalsFocus) {
      themeCounts.set(question.theme, (themeCounts.get(question.theme) ?? 0) + 1);
    }
  }

  const selectedThemes = new Set(
    diagnosticThemes
      .map((theme, order) => ({ theme, order, count: themeCounts.get(theme.id) ?? 0 }))
      .filter((item) => item.count > 0)
      .sort((left, right) => right.count - left.count || left.order - right.order)
      .slice(0, 2)
      .map(({ theme }) => theme.id),
  );
  const priorities: DiagnosticPriority[] = diagnosticThemes
    .filter((theme) => selectedThemes.has(theme.id))
    .map((theme) => ({
      theme: theme.id,
      title: theme.title,
      description: theme.description,
      selectedReflections: diagnosticQuestions
        .filter((question) => question.theme === theme.id && selected.get(question.id)?.signalsFocus)
        .map((question) => ({
          questionId: question.id,
          question: question.prompt,
          answer: selected.get(question.id)?.label ?? '',
        })),
    }));

  const plan: DiagnosticDay[] = [];
  if (priorities.length === 2) {
    priorities.forEach((priority, themeIndex) => {
      const activities = getPriorityActivities(priority);
      activities.forEach((activity, activityIndex) => {
        plan.push({ day: activityIndex * 2 + themeIndex + 1, ...activity, theme: priority.theme });
      });
    });
  } else if (priorities.length === 1) {
    getPriorityActivities(priorities[0]).forEach((activity, activityIndex) => {
      plan.push({ day: activityIndex * 2 + 1, ...activity, theme: priorities[0].theme });
    });
    generalWeekActivities.slice(0, 3).forEach((activity, index) => {
      plan.push({ day: index * 2 + 2, ...activity });
    });
  } else {
    generalWeekActivities.forEach((activity, index) => plan.push({ day: index + 1, ...activity }));
  }

  plan.push({
    day: 7,
    title: 'Revise e escolha um próximo passo',
    detail: 'Releia as práticas sem se julgar: o que dependeu de você, o que dependia de outras condições e o que gostaria de ajustar na próxima semana?',
  });

  return { status: 'complete', priorities, plan: plan.sort((left, right) => left.day - right.day) };
}

/** Pick concrete practices from the exact dilemmas that signaled each theme. */
function getPriorityActivities(priority: DiagnosticPriority): Activity[] {
  const practiceSets = priority.selectedReflections.map(({ questionId }) => activityLibraryByQuestion[questionId]);
  return Array.from({ length: 3 }, (_, index) => practiceSets[index % practiceSets.length][Math.floor(index / practiceSets.length)]);
}
