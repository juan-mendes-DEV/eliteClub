import type { Metadata } from 'next';
import ProductPage from '@/components/product-page';
import { products } from '@/lib/products';
import { getProductionUrl } from '@/lib/route-metadata';

const pageUrl = getProductionUrl('/academy');

export const metadata: Metadata = {
  title: 'Elite Academy | Conhecimento em planejamento',
  description: 'Conheça a visão da Elite Academy: conteúdos, cursos e desafios para aproximar aprendizado e prática. Produto em planejamento, ainda indisponível.',
  alternates: pageUrl ? { canonical: pageUrl } : undefined,
  openGraph: { title: 'Elite Academy | Elite Club', description: 'Conhecimento para transformar sua maneira de agir. Em planejamento.', type: 'website', locale: 'pt_BR', siteName: 'Elite Club', url: pageUrl },
};

export default function AcademyPage() {
  return <ProductPage product={products.academy} />;
}
