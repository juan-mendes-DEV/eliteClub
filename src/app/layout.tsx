import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import ScrollReveal from '@/components/scroll-reveal';
import { getProductionUrl } from '@/lib/route-metadata';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap', weight: ['400', '500', '600'], style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Elite Club | Estoicismo para escolhas contemporâneas',
  description: 'A Elite Club aplica princípios estoicos às decisões do dia a dia: examine seus julgamentos, escolha como agir e fortaleça seu caráter.',
  metadataBase: getProductionUrl('/') ? new URL(getProductionUrl('/') as string) : undefined,
  icons: { icon: '/images/logo.jpeg' },
  openGraph: {
    title: 'Elite Club | O que depende de você, hoje?',
    description: 'Princípios estoicos para examinar julgamentos, agir com responsabilidade e lidar com o que não está sob nosso controle.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Elite Club',
    url: getProductionUrl('/'),
  },
  twitter: { card: 'summary', title: 'Elite Club | Evolução com direção', description: 'Ferramentas práticas de desenvolvimento pessoal, produtividade e organização de metas.' },
  robots: process.env.VERCEL_ENV === 'preview' ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body className={`${inter.variable} ${cormorant.variable}`}><ScrollReveal />{children}</body></html>;
}
