import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SiteFooter() {
  return <footer className="footer"><div className="footer-main"><Link href="/" className="footer-brand"><Image src="/images/logo.jpeg" alt="Logo oficial da Elite Club" width={680} height={680} /><span>Uma decisão muda o caminho.</span></Link><div className="footer-nav"><div><small>EXPLORE</small><Link href="/">Início</Link><Link href="/the-elite-way">The Elite Way</Link><Link href="/journal">Elite Journal</Link><Link href="/novidades">Novidades</Link></div><div><small>ECOSSISTEMA</small><Link href="/academy">Elite Academy</Link><Link href="/planner">Elite Planner</Link><Link href="/mind-ai">Elite Mind AI</Link></div><div><small>CONECTE-SE</small><a href="https://www.instagram.com/elitecluub/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><small className="footer-info-label">INFORMAÇÕES</small><Link className="footer-pending" href="/privacidade">Política de Privacidade <i>Em elaboração</i></Link><Link className="footer-pending" href="/termos">Termos de Uso <i>Em elaboração</i></Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ELITE CLUB. TODOS OS DIREITOS RESERVADOS.</span><span>FEITO COM INTENÇÃO <b>✳</b></span></div></footer>;
}
