import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, BookOpen, Gem, HandHeart, Landmark, ShieldCheck, Target, Waves, MoveRight } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/the-elite-way');

export const metadata: Metadata = {
  title: 'The Elite Way | Estoicismo para a vida contemporânea',
  description: 'Conheça como a Elite Club aplica princípios estoicos, quatro virtudes e sete pilares próprios às escolhas da vida contemporânea.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'The Elite Way | Elite Club', description: 'Examine seus julgamentos, escolha como agir e fortaleça seu caráter.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

const virtues = [
  { title: 'Sabedoria', summary: 'Julgar com clareza.', practice: 'Separe o fato da interpretação antes de decidir o que fazer.' },
  { title: 'Justiça', summary: 'Tratar os outros com consideração.', practice: 'Considere compromissos, contexto e consequências para as pessoas envolvidas.' },
  { title: 'Coragem', summary: 'Enfrentar dificuldades.', practice: 'Dê o passo responsável que está ao seu alcance, mesmo sem garantia de resultado.' },
  { title: 'Moderação', summary: 'Lidar com desejos e excessos.', practice: 'Crie espaço entre o impulso e a escolha, sem transformar equilíbrio em culpa.' },
];

const examples = [
  { title: 'Redes sociais', text: 'Uma publicação pode receber pouca atenção. Você pode revisar sua clareza, qualidade e intenção, e aprender com o retorno. Não pode determinar o alcance nem a reação de cada pessoa.' },
  { title: 'Trabalho', text: 'Um projeto depende de uma resposta externa. É possível esclarecer o prazo, preparar alternativas e avançar em outra tarefa; não é possível garantir quando ou como a resposta virá.' },
  { title: 'Relações', text: 'Uma conversa pode começar com um mal-entendido. Você pode perguntar, explicar seu ponto e escolher o tom. Pode influenciar a conversa, mas não decidir como a outra pessoa responderá.' },
  { title: 'Consumo', text: 'Um objeto pode parecer desejável pela utilidade, pelo prazer ou pela imagem que comunica. Você pode examinar o desejo, o custo e o uso; não precisa condenar o desejo nem obedecer a todo impulso.' },
];

const pillars = [
  { title: 'Disciplina', icon: Target, explanation: 'A constância transforma intenção em movimento. Disciplina é cumprir o que importa, inclusive nos dias comuns.', practice: 'Escolha uma prioridade e reserve um momento realista para avançar nela.' },
  { title: 'Conhecimento', icon: BookOpen, explanation: 'Aprender amplia perspectivas. Conhecimento ganha valor quando é questionado, compreendido e colocado em prática.', practice: 'Estude com curiosidade. Depois, aplique uma ideia no cotidiano.' },
  { title: 'Elegância', icon: Gem, explanation: 'Elegância é cuidado sem excesso: atenção à forma, respeito ao contexto e presença nas pequenas escolhas.', practice: 'Comunique-se com clareza, escute com atenção e trate cada pessoa com consideração.' },
  { title: 'Prosperidade responsável', icon: Landmark, explanation: 'Crescer também é reconhecer impactos. Prosperidade responsável busca construir valor sem perder de vista as pessoas e os princípios.', practice: 'Considere quem é afetado pelas suas decisões antes de escolher o próximo passo.' },
  { title: 'Caráter', icon: ShieldCheck, explanation: 'Caráter é coerência entre o que se acredita, o que se diz e o que se faz — especialmente quando ninguém está observando.', practice: 'Honre acordos ou comunique com transparência quando não puder cumpri-los.' },
  { title: 'Autodomínio', icon: Waves, explanation: 'Autodomínio é criar espaço entre impulso e escolha. Não é controlar tudo, mas conduzir melhor a própria resposta.', practice: 'Faça uma pausa antes de reagir. Nomeie o que sente e escolha como agir.' },
  { title: 'Legado', icon: HandHeart, explanation: 'Legado é o que continua a ter valor além do momento. Ele se constrói nas contribuições, relações e escolhas de todos os dias.', practice: 'Pergunte que marca a sua atitude de hoje deixa nas pessoas ao redor.' },
];

export default function TheEliteWayPage() {
  return <>
    <SiteHeader />
    <main className="elite-way-page">
      <section className="editorial-hero stoic-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="editorial-hero-content"><p className="eyebrow" data-reveal>THE ELITE WAY · FILOSOFIA ESTOICA NA PRÁTICA</p><h1 data-reveal>O que depende<br />de você, <em>hoje?</em></h1><p className="editorial-subtitle" data-reveal>Examine seus julgamentos, escolha como agir e fortaleça seu caráter. Aceitar os fatos não impede agir sobre o que ainda está ao seu alcance.</p><div className="stoic-hero-actions"><Link className="button button-gold" href="/diagnostico">Começar a reflexão <ArrowUpRight size={15} /></Link><a className="editorial-scroll" href="#distincao" aria-label="Conhecer o The Elite Way"><span>CONHECER O THE ELITE WAY</span><ArrowDown size={15} /></a></div></div>
        <span className="editorial-hero-index">EC · PRINCÍPIOS PARA O COTIDIANO</span>
      </section>

      <section className="stoic-distinction section" id="distincao" aria-labelledby="stoic-distinction-title">
        <div className="section-label"><span>01</span><span>UMA DISTINÇÃO PARA AGIR</span></div>
        <div className="stoic-distinction-grid"><div><p className="eyebrow">INSPIRAÇÃO ESTOICA · APLICAÇÃO CONTEMPORÂNEA</p><h2 id="stoic-distinction-title">Nem tudo depende de nós.<br /><em>Nossa resposta importa.</em></h2></div><div className="stoic-distinction-copy"><p>A filosofia estoica convida a distinguir o que está sob nossa responsabilidade do que depende de outras pessoas, do acaso ou das circunstâncias. Nossos julgamentos, escolhas e ações são nossos para examinar; os resultados podem ser influenciados, mas não garantidos.</p><p>Aceitar um fato não é aprová-lo nem desistir. É começar pelo que aconteceu e então decidir qual ação possível é justa, corajosa e sensata.</p></div></div>
        <div className="stoic-virtues" aria-label="Quatro virtudes como referências práticas">{virtues.map((virtue) => <article key={virtue.title}><h3>{virtue.title}</h3><strong>{virtue.summary}</strong><p>{virtue.practice}</p></article>)}</div>
      </section>

      <section className="stoic-examples section" aria-labelledby="stoic-examples-title">
        <div className="section-label"><span>02</span><span>PRINCÍPIOS ANTIGOS · DILEMAS DE HOJE</span></div>
        <div className="stoic-examples-heading"><p className="eyebrow">ACEITAR O FATO TAMBÉM PODE SER O COMEÇO DA AÇÃO</p><h2 id="stoic-examples-title">Onde termina o controle.<br /><em>Onde começa a escolha.</em></h2></div>
        <div className="stoic-example-grid">{examples.map((example, index) => <article key={example.title}><span>0{index + 1}</span><h3>{example.title}</h3><p>{example.text}</p></article>)}</div>
      </section>

      <section className="elite-manifesto section" aria-labelledby="elite-manifesto-title">
        <div className="section-label"><span>03</span><span>UM MANIFESTO</span></div>
        <div className="manifesto-editorial"><p className="eyebrow">THE ELITE WAY</p><h2 id="elite-manifesto-title" className="sr-only">Manifesto da Elite Club</h2><div className="manifesto-quote-mark" aria-hidden="true">“</div><div className="manifesto-lines"><p>Excelência não é controlar tudo o que acontece.</p><p className="manifesto-emphasis">É escolher como responder ao que acontece.</p><p>Na sabedoria de examinar. Na justiça de considerar os outros. Na coragem de agir. Na moderação de não ser conduzido por todo impulso.</p><p className="manifesto-emphasis">Aceitar limites não elimina a responsabilidade de agir.</p></div><span className="manifesto-signature">EXCELÊNCIA É UMA PRÁTICA DIÁRIA</span></div>
      </section>

      <section className="pillars-section section" id="pilares" aria-labelledby="pillars-heading-title">
        <div className="section-label"><span>04</span><span>SETE APLICAÇÕES DA MARCA</span></div>
        <div className="pillars-heading"><p className="eyebrow">UMA FILOSOFIA PARA VIVER, NÃO APENAS ADMIRAR</p><h2 id="pillars-heading-title">O caminho se revela<br /><em>na prática.</em></h2><p className="body-copy">Os sete pilares abaixo são aplicações próprias da Elite Club, inspiradas por princípios estoicos e adaptadas aos temas que a marca deseja cultivar. Não são uma classificação histórica do estoicismo.</p></div>
        <div className="pillars-list">{pillars.map(({ title, icon: Icon, explanation, practice }, index) => <article className="pillar-card" key={title}><span className="pillar-index">0{index + 1}</span><div className="pillar-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.25} /></div><div className="pillar-content"><h3>{title}</h3><p>{explanation}</p><div className="pillar-practice"><span>NA PRÁTICA</span><p>{practice}</p></div></div></article>)}</div>
      </section>

      <section className="stoic-sources section" aria-labelledby="stoic-sources-title">
        <div className="section-label"><span>05</span><span>PARA CONTINUAR A LEITURA</span></div>
        <div><p className="eyebrow">REFERÊNCIAS E TRANSPARÊNCIA</p><h2 id="stoic-sources-title">Leia as fontes.<br /><em>Conheça nossa interpretação.</em></h2><p className="stoic-source-paraphrase"><strong>Paráfrase do Manual, §1:</strong> Epicteto propõe distinguir aquilo que está sob nosso encargo daquilo que não está. Esta frase é uma paráfrase editorial, não uma citação literal.</p><p className="stoic-source-brand">As explicações, exemplos atuais, quatro práticas e sete pilares nesta página são conteúdo editorial próprio da Elite Club. Os pilares são aplicações da marca, não categorias históricas atribuídas aos estoicos.</p><div className="stoic-source-links"><a href="https://classics.mit.edu/Epictetus/epicench.html" target="_blank" rel="noreferrer"><BookOpen size={16} /> Epicteto · Manual (Enchiridion), §1 <ArrowUpRight size={14} /></a><a href="https://plato.stanford.edu/entries/stoicism/" target="_blank" rel="noreferrer"><BookOpen size={16} /> Stanford Encyclopedia of Philosophy · Stoicism <ArrowUpRight size={14} /></a></div></div>
      </section>

      <section className="elite-way-close stoic-close"><div><p className="eyebrow">UMA REFLEXÃO, SEM CADASTRO</p><h2>O próximo passo<br />é <em>seu.</em></h2><p>Explore dilemas de redes, trabalho, relações e consumo e receba um plano orientativo de sete dias.</p><Link className="button button-outline" href="/diagnostico">Começar a reflexão <MoveRight size={15} /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
