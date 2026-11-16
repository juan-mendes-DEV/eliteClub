import Link from 'next/link';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import type { ProductInfo } from '@/lib/products';

export default function ProductPage({ product }: { product: ProductInfo }) {
  const Icon = product.icon;
  return <>
    <SiteHeader />
    <main className="product-landing">
      <section className="product-hero">
        <div className="product-hero-aura" aria-hidden="true" />
        <div className="product-hero-inner">
          <p className="eyebrow" data-reveal>UM PRODUTO DO ECOSSISTEMA ELITE CLUB</p>
          <div className="product-hero-icon" data-reveal aria-hidden="true"><Icon size={36} strokeWidth={1.1} /></div>
          <p className="product-status"><span />{product.status} · Ainda não disponível</p>
          <h1>{product.name}</h1>
          <p className="product-hero-lede">{product.headline}</p>
          <p className="product-hero-copy">{product.description}</p>
          <div className="product-hero-actions"><Link className="button button-gold" href="/novidades">Acompanhar novidades <ArrowUpRight size={15} /></Link><Link className="text-link" href="/#ecossistema">Conheça o ecossistema <span>↓</span></Link></div>
        </div>
        <div className="hero-index"><span>ELITE CLUB</span><span>{product.shortName.toUpperCase()} · EM PLANEJAMENTO</span></div>
      </section>

      <section className="product-concept section">
        <div className="section-label"><span>01</span><span>A IDEIA</span></div>
        <div className="product-concept-grid"><div data-reveal><p className="eyebrow">UMA PROPOSTA EM CONSTRUÇÃO</p><h2>Feito para aproximar<br /><em>intenção e ação.</em></h2></div><div className="product-concept-copy" data-reveal><p className="body-copy">{product.concept}</p><p className="product-development-note"><span /> Este produto está em fase de planejamento. Recursos, formato e prazos ainda podem mudar.</p></div></div>
      </section>

      <section className="product-benefits section">
        <div className="section-label"><span>02</span><span>BENEFÍCIOS EM ESTUDO</span></div>
        <div className="section-heading" data-reveal><div><p className="eyebrow">O QUE QUEREMOS TORNAR POSSÍVEL</p><h2>Uma ideia com<br /><em>aplicação real.</em></h2></div><p className="body-copy">Estas são direções que estamos explorando — não funcionalidades disponíveis. Vamos compartilhar novidades quando os próximos passos estiverem definidos.</p></div>
        <ul className="product-benefit-list">{product.benefits.map((benefit, index) => <li data-reveal key={benefit}><span className="benefit-number">0{index + 1}</span><span>{benefit}</span><MoveRight size={16} strokeWidth={1.2} aria-hidden="true" /></li>)}</ul>
      </section>

      <section className="product-status-cta"><div className="product-status-cta-inner" data-reveal><p className="eyebrow">{product.name.toUpperCase()}</p><h2>Estamos construindo<br />com <em>intenção.</em></h2><p>O acesso ainda não está disponível. Você pode acompanhar novidades por esta página demonstrativa.</p><Link className="button button-outline" href="/novidades">Acompanhar lançamentos <ArrowUpRight size={15} /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
