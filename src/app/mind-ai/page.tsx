import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';
import { products } from '@/lib/products';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/mind-ai');

export const metadata: Metadata = {
  title: 'Elite Mind AI | Mentor de IA em planejamento',
  description: 'Conheça o conceito da Elite Mind AI: inteligência artificial pensada para apoiar reflexão e objetivos. Produto em planejamento, ainda indisponível.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'Elite Mind AI | Elite Club', description: 'Inteligência para ajudar você a encontrar direção. Em planejamento.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

export default function MindAiPage() {
  return <ProductPage product={products['mind-ai']} />;
}
