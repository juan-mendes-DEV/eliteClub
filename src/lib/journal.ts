import type { ProductSlug } from '@/lib/products';

export const journalCategories = [
  'Mentalidade e disciplina',
  'Conhecimento',
  'Comunicação e elegância',
  'Produtividade',
  'Prosperidade responsável',
  'Tecnologia e futuro',
] as const;

export type JournalCategory = (typeof journalCategories)[number];
export type JournalStatus = 'draft' | 'published';

/** Estimate Portuguese editorial reading time at a conservative 200 wpm. */
export function estimateReadingTime(content: readonly string[]): number {
  const words = content.join(' ').trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface JournalArticleBase {
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: JournalCategory;
  readingTime: number;
  content: string[];
  coverSuggestion: string;
  internalLinks: { label: string; href: string }[];
  diagnosticCta: { label: string; href: '/diagnostico' | '/the-elite-way' };
  relatedProducts: ProductSlug[];
}

export type JournalArticle = JournalArticleBase & (
  | { status: 'draft'; publishedAt: null }
  | { status: 'published'; publishedAt: string }
);

// Slugs reserve the future URL but draft articles are intentionally not routed
// or listed until editorial approval and a real publication date are provided.
export const draftArticles: JournalArticle[] = [
  {
    slug: 'disciplina-base-verdadeira-liberdade',
    title: 'A disciplina como caminho para a liberdade',
    description: 'Entenda como compromissos escolhidos com consciência podem abrir espaço para mais liberdade no cotidiano.',
    summary: 'Disciplina não precisa significar rigidez. Uma estrutura simples, escolhida por você e ajustada à vida real, pode reduzir decisões repetidas e facilitar ações alinhadas às suas prioridades.',
    category: 'Mentalidade e disciplina',
    status: 'draft',
    publishedAt: null,
    readingTime: 2,
    coverSuggestion: 'Uma agenda aberta sobre uma mesa de madeira, luz natural suave e poucos objetos; sem relógios de luxo ou estética de produtividade extrema.',
    internalLinks: [
      { label: 'The Elite Way', href: '/the-elite-way' },
      { label: 'Elite Planner (em planejamento)', href: '/planner' },
    ],
    diagnosticCta: { label: 'Descubra quais hábitos você deseja fortalecer.', href: '/diagnostico' },
    relatedProducts: ['planner', 'academy'],
    content: [
      'Liberdade costuma ser associada à ausência de limites. No cotidiano, porém, depender apenas da vontade do momento pode nos deixar diante das mesmas decisões, distrações e urgências. Uma estrutura escolhida com consciência pode liberar atenção para aquilo que realmente importa.',
      'Imagine alguém que quer voltar a estudar depois do trabalho. Se a decisão precisa ser tomada do zero toda noite, o cansaço pode virar uma negociação. Deixar o material separado, escolher um horário possível e começar com vinte minutos reduz o atrito inicial. Nesse caso, disciplina não é rigidez: é preparar o caminho para uma escolha que a própria pessoa considera valiosa.',
      'Isso não significa que a mesma rotina funcione para todo mundo. Horários, responsabilidades, saúde e recursos variam. Um plano útil precisa caber na vida real e pode mudar quando as circunstâncias mudam. A intenção não é cumprir uma sequência perfeita, mas definir um próximo passo claro o bastante para ser retomado.',
      'Experimente escolher uma prioridade para a semana e decidir quando cuidar dela. Em vez de “vou me organizar melhor”, tente: “na quarta-feira, depois do café, vou revisar as três tarefas mais importantes”. No fim, observe o que ajudou e o que atrapalhou, sem transformar um imprevisto em julgamento sobre si.',
      'Na perspectiva editorial da Elite Club, disciplina é uma forma de cuidado com os compromissos que escolhemos. Ela não garante resultados nem elimina obstáculos. Pode ajudar a agir de acordo com as próprias prioridades e abrir espaço para menos decisões no piloto automático.',
    ],
  },
  {
    slug: 'elegancia-nao-e-ostentacao-comportamento',
    title: 'Elegância não é ostentação: é comportamento',
    description: 'Uma reflexão prática sobre presença, respeito e cuidado nas interações — sem confundir elegância com aparência ou consumo.',
    summary: 'Uma perspectiva editorial sobre elegância para além da aparência: escuta, clareza, respeito ao contexto e atenção ao efeito das próprias escolhas nas interações.',
    category: 'Comunicação e elegância',
    status: 'draft',
    publishedAt: null,
    readingTime: 2,
    coverSuggestion: 'Uma cadeira vazia junto a uma mesa de reunião simples, luz natural lateral e composição acolhedora; evitar marcas, joias ou sinais de luxo.',
    internalLinks: [
      { label: 'Conheça os princípios The Elite Way', href: '/the-elite-way' },
      { label: 'Elite Academy (em planejamento)', href: '/academy' },
    ],
    diagnosticCta: { label: 'Conheça os princípios The Elite Way.', href: '/the-elite-way' },
    relatedProducts: ['academy'],
    content: [
      'Elegância pode aparecer na roupa, na arquitetura ou em um objeto bem-feito. Reduzi-la, porém, a preço e aparência deixa de lado outra dimensão: a maneira como tratamos as pessoas. Nesta reflexão, elegância é uma escolha de comportamento, expressa em cuidado com o contexto, clareza e respeito.',
      'Em uma conversa, isso pode ser escutar até o fim, discordar sem humilhar e reconhecer quando não se sabe algo. Em uma reunião, pode significar chegar preparado, respeitar o tempo combinado e abrir espaço para outras pessoas contribuírem. São gestos observáveis que não dependem de um guarda-roupa específico nem de um ambiente de prestígio.',
      'Na escrita, uma mensagem com contexto suficiente e um pedido claro pode evitar que alguém precise adivinhar o que fazer. Se o assunto for delicado, vale considerar também o canal e o momento. A forma não substitui o conteúdo, mas pode tornar a intenção mais compreensível.',
      'Antes de uma interação, experimente perguntar: “O que a outra pessoa precisa compreender para que esta conversa seja respeitosa e produtiva?”. Depois, confira se o tom combina com sua intenção. Ser cordial não exige concordar com tudo; ser direto não exige ser áspero.',
      'Esta é uma perspectiva editorial da Elite Club, não uma definição universal de elegância. Contextos diferentes têm códigos próprios, que também podem ser questionados. O princípio proposto aqui é simples: cuidado não é espetáculo; é atenção ao efeito das nossas escolhas sobre as outras pessoas.',
    ],
  },
  {
    slug: 'transformar-objetivos-em-habitos-consistentes',
    title: 'Como transformar objetivos em hábitos consistentes',
    description: 'Um método prático para tornar objetivos mais claros, escolher uma ação pequena e revisar o plano sem buscar perfeição.',
    summary: 'Um roteiro flexível para sair de uma intenção ampla, escolher uma ação observável, preparar o começo e ajustar o plano conforme a rotina — sem tratar consistência como perfeição.',
    category: 'Produtividade',
    status: 'draft',
    publishedAt: null,
    readingTime: 2,
    coverSuggestion: 'Um par de tênis ao lado de uma agenda com poucos compromissos marcados, em ambiente cotidiano e acessível; sem estética de transformação física ou promessa de resultado.',
    internalLinks: [
      { label: 'Elite Planner (em planejamento)', href: '/planner' },
      { label: 'Elite Academy (em planejamento)', href: '/academy' },
    ],
    diagnosticCta: { label: 'Comece seu plano de evolução de sete dias.', href: '/diagnostico' },
    relatedProducts: ['planner', 'academy'],
    content: [
      'Um objetivo aponta uma direção; um hábito é uma ação que pode ser repetida. “Quero aprender um idioma” expressa uma intenção, mas ainda deixa perguntas em aberto: quando começar, por quanto tempo e qual será a primeira atividade? Traduzir a intenção em uma ação concreta ajuda a aproximar plano e cotidiano.',
      'Comece definindo o que “avançar” significa para você. Em vez de “quero me movimentar mais”, alguém pode escolher “caminhar por vinte minutos três vezes nesta semana”, se isso for adequado à sua rotina e às suas condições de saúde. Outra pessoa pode precisar de uma meta diferente. O exemplo é um ponto de partida, não uma prescrição.',
      'Depois, associe a ação a um momento ou situação que já exista: “depois do almoço de terça, vou caminhar no quarteirão”. Prepare o que puder, como separar os tênis. Se a versão planejada não couber em um dia corrido, escolha uma alternativa menor — talvez uma caminhada mais curta — sem tratá-la como fracasso nem como substituta permanente do plano.',
      'Registrar o que aconteceu pode revelar obstáculos concretos. No fim da semana, anote quando foi fácil começar, o que interferiu e qual ajuste parece possível. Se a meta não coube, experimente outra frequência ou horário. Ajustar o plano não significa abandonar o objetivo.',
      'Consistência não é perfeição. Uma interrupção não apaga o que veio antes; pode informar sobre o contexto e sobre o tamanho do plano. Se houver dor, exaustão ou uma orientação profissional relevante, priorize a segurança e procure o apoio adequado em vez de insistir em uma rotina genérica.',
      'A proposta editorial da Elite Club é tratar hábitos como ferramentas a serviço de objetivos pessoais, não como medida de valor. Escolha uma ação observável, encontre um lugar possível para ela na agenda e revise o plano com honestidade. O próximo passo precisa ser viável para começar e significativo para você.',
    ],
  },
];

export const publishedArticles: Extract<JournalArticle, { status: 'published' }>[] = [];
