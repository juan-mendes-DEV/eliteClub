import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, CalendarDays, Layers3 } from 'lucide-react';

export type ProductSlug = 'academy' | 'planner' | 'mind-ai';

export interface ProductInfo {
  slug: ProductSlug;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  concept: string;
  status: string;
  icon: LucideIcon;
  benefits: string[];
}

export const products: Record<ProductSlug, ProductInfo> = {
  academy: {
    slug: 'academy',
    name: 'Elite Academy',
    shortName: 'Academy',
    headline: 'Conhecimento para transformar sua maneira de agir.',
    description: 'Uma biblioteca digital em planejamento para aproximar aprendizado e prática — com conteúdos, cursos e desafios organizados em uma jornada de evolução.',
    concept: 'A Elite Academy está sendo concebida como um espaço de aprendizado contínuo. A proposta é organizar ideias e conhecimentos em experiências que façam sentido fora da tela, no ritmo de cada pessoa.',
    status: 'Em planejamento',
    icon: Layers3,
    benefits: ['Conteúdos organizados por temas de desenvolvimento pessoal.', 'Cursos pensados para conectar conhecimento e aplicação.', 'Desafios como convite à consistência e à prática.'],
  },
  planner: {
    slug: 'planner',
    name: 'Elite Planner',
    shortName: 'Planner',
    headline: 'Organize suas metas. Desenvolva consistência.',
    description: 'Um conceito de aplicativo em planejamento para dar mais clareza à organização de objetivos, hábitos e próximos passos.',
    concept: 'A Elite Planner está sendo pensada para ajudar a transformar intenção em um plano possível. Um lugar para olhar para suas metas com clareza e construir consistência sem perder de vista o que importa.',
    status: 'Em planejamento',
    icon: CalendarDays,
    benefits: ['Organização de objetivos em etapas mais claras.', 'Espaço dedicado ao planejamento de hábitos.', 'Uma visão do percurso e do próximo passo.'],
  },
  'mind-ai': {
    slug: 'mind-ai',
    name: 'Elite Mind AI',
    shortName: 'Mind AI',
    headline: 'Inteligência para ajudar você a encontrar direção e acompanhar sua evolução.',
    description: 'A visão de um mentor de inteligência artificial em planejamento para apoiar reflexão e acompanhamento de objetivos.',
    concept: 'A Elite Mind AI é uma proposta em estudo: usar tecnologia com responsabilidade para apoiar a clareza de objetivos, a reflexão e a evolução pessoal. Não é um serviço de IA disponível nesta etapa.',
    status: 'Em planejamento',
    icon: BrainCircuit,
    benefits: ['Apoio à reflexão sobre objetivos e prioridades.', 'Conversas orientadas por intenção e contexto.', 'Uma visão de acompanhamento da evolução pessoal.'],
  },
};
