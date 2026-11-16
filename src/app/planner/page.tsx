import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';
import { products } from '@/lib/products';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/planner');

export const metadata: Metadata = {
  title: 'Elite Planner | Metas e hábitos em planejamento',
  description: 'Conheça a proposta da Elite Planner para organização de metas, hábitos e próximos passos. Aplicativo em planejamento, ainda indisponível.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'Elite Planner | Elite Club', description: 'Organize suas metas. Desenvolva consistência. Em planejamento.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

export default function PlannerPage() {
  return <ProductPage product={products.planner} />;
}
