import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import DiagnosticExperience from '@/components/diagnostic-experience';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/diagnostico');

export const metadata: Metadata = {
  title: 'Diagnóstico Elite — Uma reflexão estoica sobre suas escolhas',
  description: 'Uma reflexão gratuita de dez dilemas contemporâneos e sete práticas orientativas. Sem cadastro e sem envio de respostas.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: {
    title: 'Diagnóstico Elite — Uma reflexão estoica sobre suas escolhas | Elite Club',
    description: 'Examine dilemas atuais e escolha práticas para os próximos sete dias.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Elite Club',
    url: pageUrl,
  },
};

export default function DiagnosticPage() {
  return <><SiteHeader /><DiagnosticExperience /><SiteFooter /></>;
}
