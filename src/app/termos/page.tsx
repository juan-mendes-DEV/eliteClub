import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/termos');

export const metadata: Metadata = {
  title: 'Termos de Uso | Em elaboração | Elite Club',
  description: 'Os termos de uso da Elite Club estão em elaboração. Nenhuma inscrição ou serviço é oferecido pelo formulário demonstrativo.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <><SiteHeader /><main className="legal-page"><p className="eyebrow">DOCUMENTO EM ELABORAÇÃO</p><h1>Termos de <em>Uso</em></h1><p className="legal-notice" role="status">Este documento ainda não é um termo vigente. O site apresenta informações institucionais e produtos em planejamento. O formulário em <Link href="/novidades">Novidades</Link> é apenas demonstrativo: não realiza inscrições ou outros serviços.</p><Link className="under-link" href="/novidades">Voltar para Novidades <span aria-hidden="true">→</span></Link></main><SiteFooter /></>;
}
