import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MoveRight } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { publishedArticles } from '@/lib/journal';
import { products } from '@/lib/products';
import { getProductionUrl } from '@/lib/route-metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedArticles.map(({ slug }) => ({ slug }));
}

async function findArticle(slug: string) {
  return publishedArticles.find((article) => article.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) return { title: 'Artigo não encontrado | Elite Journal', robots: { index: false, follow: false } };
  const articleUrl = getProductionUrl(`/journal/${article.slug}`);
  return {
    title: `${article.title} | Elite Journal`,
    description: article.description,
    alternates: articleUrl ? { canonical: articleUrl } : undefined,
    openGraph: { title: `${article.title} | Elite Journal`, description: article.description, type: 'article', locale: 'pt_BR', siteName: 'Elite Club', publishedTime: article.publishedAt, url: articleUrl },
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();
  const articleIndex = publishedArticles.findIndex((item) => item.slug === article.slug);
  const previousArticle = publishedArticles[articleIndex - 1];
  const nextArticle = publishedArticles[articleIndex + 1];

  return <>
    <SiteHeader />
    <main className="journal-article-page">
      <article>
        <header className="journal-article-header"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p>{article.description}</p><div><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${article.publishedAt}T12:00:00Z`))}</time><span>{article.readingTime} min de leitura</span></div><p className="journal-article-summary">{article.summary}</p></header>
        <div className="journal-article-content">{article.content.map((paragraph, index) => <p key={`${article.slug}-${index}`}>{paragraph}</p>)}</div>
        <aside className="journal-context-links" aria-label="Leituras e páginas relacionadas"><h2>Continue explorando</h2>{article.internalLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}<MoveRight size={14} /></Link>)}</aside>
        <aside className="journal-diagnostic-cta" aria-label="Próximo passo"><p className="eyebrow">UM PRÓXIMO PASSO, NO SEU RITMO</p><Link href={article.diagnosticCta.href}>{article.diagnosticCta.label}<MoveRight size={15} /></Link><p>Experiência gratuita, sem cadastro. O resultado é orientativo.</p></aside>
        <aside className="journal-related" aria-labelledby="journal-related-title"><p className="eyebrow">CONTINUE EXPLORANDO</p><h2 id="journal-related-title">Ideias que ganham <em>movimento.</em></h2><div>{article.relatedProducts.map((slug) => { const product = products[slug]; return <Link key={slug} href={`/${slug}`}><span>{product.name}</span><MoveRight size={15} /></Link>; })}</div></aside>
        <nav className="journal-article-nav" aria-label="Navegação entre artigos">{previousArticle ? <Link href={`/journal/${previousArticle.slug}`}><ArrowLeft size={15} /><span><small>ARTIGO ANTERIOR</small>{previousArticle.title}</span></Link> : <span />}{nextArticle ? <Link href={`/journal/${nextArticle.slug}`}><span><small>PRÓXIMO ARTIGO</small>{nextArticle.title}</span><ArrowRight size={15} /></Link> : <Link href="/journal"><span><small>ELITE JOURNAL</small>Voltar às publicações</span><ArrowRight size={15} /></Link>}</nav>
        <Link href="/journal" className="under-link"><ArrowLeft size={15} /> Voltar à Elite Journal</Link>
      </article>
    </main>
    <SiteFooter />
  </>;
}
