import Image from 'next/image';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Link from 'next/link';
import { ArrowUpRight, Compass, BrainCircuit, CalendarDays, MoveRight, Sparkles, Target, Layers3 } from 'lucide-react';
import type { Metadata } from 'next';
import { getProductionUrl } from '@/lib/route-metadata';

const homepageUrl = getProductionUrl('/');

export const metadata: Metadata = {
  title: 'Elite Club | O que depende de você, hoje?',
  description: 'Pratique princípios estoicos nas decisões do dia a dia. Examine seus julgamentos, escolha como agir e fortaleça seu caráter.',
  alternates: homepageUrl ? { canonical: homepageUrl } : undefined,
  openGraph: { title: 'O que depende de você, hoje? | Elite Club', description: 'Estoicismo aplicado às escolhas contemporâneas.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: homepageUrl },
};

const products = [
  { id: 'academy', number: '01', name: 'Elite Academy', description: 'Conhecimento para transformar sua maneira de agir.', status: 'Em planejamento', icon: Layers3 },
  { id: 'planner', number: '02', name: 'Elite Planner', description: 'Organize suas metas. Desenvolva consistência.', status: 'Em planejamento', icon: CalendarDays },
  { id: 'mind-ai', number: '03', name: 'Elite Mind AI', description: 'Inteligência para ajudar você a encontrar direção e acompanhar sua evolução.', status: 'Em planejamento', icon: BrainCircuit },
];
const steps = [ ['01', 'Descobrir', 'Encontre clareza sobre o que importa.'], ['02', 'Planejar', 'Transforme intenção em um caminho possível.'], ['03', 'Executar', 'Avance com disciplina, um dia de cada vez.'], ['04', 'Evoluir', 'Aprenda com o percurso e siga adiante.'] ];

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero stoic-home-hero" id="inicio">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow hero-eyebrow"><span /> ESTOICISMO PARA A VIDA CONTEMPORÂNEA</p>
          <div className="hero-mark"><Image src="/images/logo.jpeg" alt="Logo oficial Elite Club com monograma FC e coroa dourada" width={1180} height={1180} priority /></div>
          <h1>O que depende de você,<br /><em>hoje?</em></h1>
          <p className="hero-copy">Pratique o estoicismo nas decisões do dia a dia. Examine seus julgamentos, escolha como agir e fortaleça seu caráter.</p>
          <div className="hero-actions"><Link className="button button-gold" href="/diagnostico">Começar a reflexão <MoveRight size={16} /></Link><Link className="text-link" href="/the-elite-way">Conhecer o The Elite Way <ArrowUpRight size={15} /></Link></div>
          <div className="hero-index"><span>01 / 07</span><span>DESENVOLVIMENTO COM INTENÇÃO</span><span>SCROLL PARA EXPLORAR ↓</span></div>
        </div>
        <div className="hero-side-note" aria-hidden="true">CLAREZA · CONSTÂNCIA · EVOLUÇÃO</div>
      </section>

      <section className="manifesto section" id="manifesto">
        <div className="section-label"><span>01</span><span>O NOSSO MANIFESTO</span></div>
        <div className="manifesto-content" data-reveal><p className="eyebrow">UMA DISTINÇÃO ESTOICA PARA O COTIDIANO</p><h2>O que depende<br /><em>de você?</em></h2><p className="body-copy">Nem tudo está sob nosso comando. Podemos examinar julgamentos, escolher atitudes e agir; também podemos influenciar alguns resultados, sem garanti-los. A Elite Club aplica essa distinção a decisões contemporâneas — sem prometer controle sobre o que pertence ao acaso ou às escolhas alheias.</p><ul className="manifesto-virtues" aria-label="Quatro virtudes como referências de ação"><li><strong>Sabedoria</strong><span>julgar com clareza</span></li><li><strong>Justiça</strong><span>tratar os outros com consideração</span></li><li><strong>Coragem</strong><span>enfrentar dificuldades</span></li><li><strong>Moderação</strong><span>lidar com desejos e excessos</span></li></ul><Link href="/the-elite-way" className="under-link">Explore essa filosofia <ArrowUpRight size={15} /></Link></div>
        <div className="manifesto-seal" data-reveal><span>EC</span><small>EVOLUÇÃO<br />COM INTENÇÃO</small></div>
      </section>

      <section className="ecosystem section" id="ecossistema">
        <div className="section-label"><span>02</span><span>UM ECOSSISTEMA EM CONSTRUÇÃO</span></div>
        <div className="section-heading" data-reveal><div><p className="eyebrow">TRÊS CAMINHOS. UMA MESMA INTENÇÃO.</p><h2>Conhecimento que<br /><em>ganha movimento.</em></h2></div><p className="body-copy">Uma visão que conecta desenvolvimento pessoal, produtividade, hábitos e organização de metas. Estamos construindo cada parte com intenção.</p></div>
        <div className="product-grid">{products.map(({ id, number, name, description, status, icon: Icon }) => <article className="product-card" id={id} data-reveal key={name}><div className="card-top"><span>{number} / EC</span><Icon size={23} strokeWidth={1.2} /></div><div className="product-symbol"><Icon size={30} strokeWidth={1.1} /></div><h3>{name}</h3><p>{description}</p><div className="card-bottom"><span className="status"><i />{status}</span><Link className="product-details-link" href={`/${id}`}>Conheça a proposta <ArrowUpRight size={13} /></Link></div></article>)}</div>
        <p className="availability-note" data-reveal><span>—</span> Os produtos ainda não estão disponíveis. Compartilharemos novidades à medida que o desenvolvimento avançar.</p>
      </section>

      <section className="diagnostic-promo" aria-labelledby="diagnostic-promo-title"><div className="diagnostic-promo-mark" aria-hidden="true">DE<span>01</span></div><div className="diagnostic-promo-copy"><p className="eyebrow">UMA EXPERIÊNCIA GRATUITA · SEM CADASTRO</p><h2 id="diagnostic-promo-title">Toda evolução começa<br />por um <em>primeiro passo.</em></h2><p>Reflita sobre dilemas contemporâneos e receba sete práticas para agir com mais intenção, uma por dia.</p><Link className="button button-gold" href="/diagnostico">Iniciar Diagnóstico Elite <ArrowUpRight size={15} /></Link><span>Dez perguntas · cerca de 4–5 minutos · respostas não são enviadas.</span></div></section>

      <section className="journey section" id="jornada"><div className="section-label"><span>03</span><span>UMA JORNADA, NO SEU TEMPO</span></div><div className="journey-head" data-reveal><p className="eyebrow">EVOLUIR É UM PROCESSO</p><h2>Um passo consciente<br />muda <em>o próximo.</em></h2></div><div className="steps">{steps.map(([num, title, text]) => <article className="step" data-reveal key={num}><span className="step-number">{num}</span><div className="step-line" /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="journey-foot" data-reveal><Compass size={18} strokeWidth={1.2} /><span>Não existe atalho para o que vale a pena construir.</span></div></section>

       <section className="vision section" id="visao"><div className="vision-image" data-reveal><div className="vision-orbit orbit-one"/><div className="vision-orbit orbit-two"/><span className="vision-mark">EC</span><span className="vision-caption">INTENÇÃO EM CADA PASSO</span></div><div className="vision-copy" data-reveal><div className="section-label"><span>04</span><span>SOBRE A ELITE CLUB</span></div><p className="eyebrow">UMA VISÃO EM CONSTRUÇÃO</p><h2>Princípios antigos.<br /><em>Dilemas de hoje.</em></h2><p className="body-copy">A Elite Club toma o estoicismo como referência prática: reconhecer limites, examinar julgamentos e escolher ações responsáveis. Isso não significa passividade — aceitar um fato pode coexistir com agir sobre o que ainda está ao nosso alcance.</p><p className="body-copy">Os produtos em planejamento buscam aproximar intenção e ação com clareza, consistência e espaço para cada pessoa avançar no próprio ritmo.</p><div className="founders-note"><span className="founders-icon"><Sparkles size={17} /></span><span><strong>Uma história sendo construída</strong><small>Em breve, compartilharemos mais sobre as pessoas por trás da Elite Club.</small></span></div></div></section>

      <section className="curiosity section" id="experiencia"><div className="curiosity-copy" data-reveal><div className="section-label"><span>05</span><span>O QUE ESTAMOS CONSTRUINDO</span></div><p className="eyebrow">UMA IDEIA QUE ESTÁ GANHANDO FORMA</p><h2>E se sua evolução<br />tivesse <em>um plano?</em></h2><p className="body-copy">Imagine reunir seus objetivos, hábitos e aprendizados em um único lugar. Essa é a experiência que estamos construindo.</p><a className="under-link" href="#ecossistema">Explore a visão do ecossistema <ArrowUpRight size={15} /></a></div><div className="curiosity-art" data-reveal aria-hidden="true"><div className="plan-sheet"><span className="plan-caption">SEU PRÓXIMO CAPÍTULO</span><span className="plan-heading">Intenção<br /><em>em movimento.</em></span><span className="plan-rule"/><span className="plan-row"><i/> Clareza <b>01</b></span><span className="plan-row"><i/> Consistência <b>02</b></span><span className="plan-row"><i/> Evolução <b>03</b></span></div><div className="plan-orbit"/></div></section>

      <section className="updates" id="novidades"><div className="updates-inner" data-reveal><p className="eyebrow">O PRÓXIMO CAPÍTULO COMEÇA AQUI</p><h2>Sua próxima conquista<br />começa com uma <em>decisão.</em></h2><p>Acompanhe a construção de uma nova experiência em desenvolvimento pessoal.</p><Link className="button button-outline" href="/novidades">Conheça a página de novidades <ArrowUpRight size={16} /></Link><span className="updates-note">Formulário demonstrativo · nenhuma inscrição é enviada.</span></div><div className="updates-decoration" aria-hidden="true"><Target size={190} strokeWidth={0.5} /></div></section>

       <section className="faq section" id="faq"><div className="faq-intro" data-reveal><div className="section-label"><span>07</span><span>PERGUNTAS FREQUENTES</span></div><p className="eyebrow">TUDO COM TRANSPARÊNCIA</p><h2>O que você<br />quer <em>saber?</em></h2><p className="body-copy">Uma ideia clara merece respostas simples.</p></div><div className="faq-list" data-reveal><details><summary>O que é a Elite Club?<span>+</span></summary><p>A Elite Club aplica princípios estoicos a escolhas contemporâneas e desenvolve ferramentas de evolução pessoal, produtividade, hábitos, organização de metas e crescimento profissional.</p></details><details><summary>O estoicismo significa aceitar tudo passivamente?<span>+</span></summary><p>Não. Distinguir o que não controlamos ajuda a escolher onde agir: podemos influenciar resultados sem garanti-los e responder com responsabilidade ao que acontece.</p></details><details><summary>Quais produtos estão planejados?<span>+</span></summary><p>Estamos planejando a Elite Academy, a Elite Planner e a Elite Mind AI. Todos estão em desenvolvimento e ainda não estão disponíveis para uso.</p></details><details><summary>Como posso acompanhar os lançamentos?<span>+</span></summary><p>Acompanhe o perfil oficial <a href="https://www.instagram.com/elitecluub/" target="_blank" rel="noreferrer">@elitecluub no Instagram</a>. Publicaremos novidades quando houver informações confirmadas.</p></details><details><summary>Já posso criar uma conta ou acessar produtos?<span>+</span></summary><p>Ainda não. Nesta etapa, a área de membros e os produtos não estão disponíveis. Não há cadastro ou lista de espera ativa neste momento.</p></details></div></section>
    </main>
    <SiteFooter />
  </>;
}
