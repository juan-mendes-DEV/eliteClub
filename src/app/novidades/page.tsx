import type { Metadata } from 'next';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import InterestDemoForm from '@/components/interest-demo-form';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/novidades');

export const metadata: Metadata = {
  title: 'Novidades | Acompanhe a Elite Club',
  description: 'Conheça o espaço demonstrativo para receber novidades da Elite Club. O formulário ainda não está conectado e não envia seus dados.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'Novidades | Elite Club', description: 'Acompanhe os próximos passos da Elite Club.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

export default function NovidadesPage() {
  return <>
    <SiteHeader />
    <main className="interest-page">
      <section className="interest-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="interest-hero-inner"><p className="eyebrow">UMA IDEIA EM CONSTRUÇÃO</p><h1>Acompanhe o que<br /><em>vem pela frente.</em></h1><p>Novidades sobre a Elite Club, seus produtos em planejamento e novas ideias para evoluir com intenção.</p><a href="#demonstracao" className="button button-gold">Ver demonstração <span aria-hidden="true">↓</span></a></div>
        <span className="interest-hero-index">ELITE CLUB · NOVOS CAPÍTULOS</span>
      </section>

      <section className="interest-form-section" id="demonstracao" aria-labelledby="interest-form-title">
        <div className="interest-form-intro"><p className="eyebrow">UM CANAL PARA FUTURAS NOVIDADES</p><h2 id="interest-form-title">Fique por dentro<br />com <em>intenção.</em></h2><p>Estamos preparando uma forma segura de compartilhar atualizações. Até lá, este formulário é apenas uma demonstração visual.</p><div className="interest-privacy-note"><ShieldCheck size={18} strokeWidth={1.3} /><span><strong>Seus dados não serão enviados.</strong><small>Não há integração de cadastro ou envio de e-mails neste site.</small></span></div></div>
        <InterestDemoForm />
      </section>

      <section className="interest-next-steps"><p className="eyebrow">ACOMPANHE SEM CADASTRO</p><h2>Por enquanto, estamos<br />no <em>Instagram.</em></h2><p>Acompanhe o perfil oficial para ver atualizações públicas. Não é necessário fornecer dados pessoais.</p><a className="button button-outline" href="https://www.instagram.com/elitecluub/" target="_blank" rel="noreferrer">Visitar @elitecluub <ArrowUpRight size={15} /></a></section>
    </main>
    <SiteFooter />
  </>;
}
