import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { journalCategories, publishedArticles } from '@/lib/journal';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/journal');

export const metadata: Metadata = {
  title: 'Elite Journal | Ideias para evoluir com intenção',
  description: 'Ideias originais sobre disciplina, elegância e produtividade para evoluir com intenção. Leia a Elite Journal.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'Elite Journal | Elite Club', description: 'Ideias originais para evoluir com intenção.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

export default function JournalPage() {
  return <>
    <SiteHeader />
    <main className="journal-page">
      <section className="journal-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="journal-hero-inner"><p className="eyebrow" data-reveal>UM ESPAÇO PARA IDEIAS QUE MOVEM</p><h1 data-reveal>Elite <em>Journal.</em></h1><p className="journal-lede" data-reveal>Conhecimento para observar melhor, pensar com clareza e seguir em frente.</p><span className="journal-status" data-reveal><i /> REVISTA DIGITAL · {publishedArticles.length ? 'PUBLICAÇÕES EDITORIAIS' : 'EM PREPARAÇÃO'}</span></div>
        <div className="journal-hero-side" aria-hidden="true">PENSAMENTO · PRÁTICA · PERSPECTIVA</div>
      </section>

      <section className="journal-categories section">
        <div className="section-label"><span>01</span><span>ÁREAS EDITORIAIS</span></div>
        <div className="journal-section-heading" data-reveal><div><p className="eyebrow">UM CAMPO AMPLO DE DESCOBERTA</p><h2>Temas para ampliar<br /><em>o olhar.</em></h2></div><p className="body-copy">Uma seleção de temas para explorar com ideias originais, úteis e alinhadas aos princípios da Elite Club.</p></div>
        <ul className="journal-category-list">{journalCategories.map((category, index) => <li data-reveal key={category}><span className="journal-category-number">0{index + 1}</span><h2>{category}</h2><span className="journal-category-marker" aria-hidden="true" /></li>)}</ul>
      </section>

      {publishedArticles.length === 0 && <section className="journal-editorial-state" aria-labelledby="journal-state-title">
        <div className="journal-state-mark" aria-hidden="true">EJ</div>
        <div className="journal-state-copy" data-reveal><p className="eyebrow">A REDAÇÃO ESTÁ EM PREPARAÇÃO</p><h2 id="journal-state-title">Toda boa ideia<br />merece <em>tempo.</em></h2><p>Os primeiros textos estão em revisão editorial e ainda não foram publicados. Enquanto isso, conheça caminhos que estamos desenvolvendo.</p><div className="journal-empty-actions"><Link className="button button-gold" href="/planner">Conheça o Elite Planner <ArrowUpRight size={15} /></Link><Link className="text-link" href="/novidades">Acompanhe as novidades <MoveRight size={15} /></Link></div></div>
      </section>}

      {publishedArticles.length > 0 && <section className="journal-articles section" aria-labelledby="journal-articles-title"><div className="section-label"><span>02</span><span>PUBLICAÇÕES</span></div><h2 id="journal-articles-title">Da Elite <em>Journal.</em></h2><div className="journal-article-grid">{publishedArticles.map((article) => <article className="journal-article-card" key={article.slug}><span>{article.category}</span><h3><Link href={`/journal/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><div><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${article.publishedAt}T12:00:00Z`))}</time><span>{article.readingTime} min de leitura</span></div></article>)}</div></section>}
    </main>
    <SiteFooter />
  </>;
}
