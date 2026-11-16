import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/privacidade');

export const metadata: Metadata = {
  title: 'Política de Privacidade | Em elaboração | Elite Club',
  description: 'A política de privacidade da Elite Club está em elaboração. O formulário demonstrativo de novidades não envia nem armazena dados.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <><SiteHeader /><main className="legal-page"><p className="eyebrow">DOCUMENTO EM ELABORAÇÃO</p><h1>Política de <em>Privacidade</em></h1><p className="legal-notice" role="status">Este documento ainda não é uma política vigente. O formulário em <Link href="/novidades">Novidades</Link> é demonstrativo e não transmite nem armazena os dados inseridos. Uma política completa será publicada antes de qualquer coleta operacional.</p><Link className="under-link" href="/novidades">Voltar para Novidades <span aria-hidden="true">→</span></Link></main><SiteFooter /></>;
}
