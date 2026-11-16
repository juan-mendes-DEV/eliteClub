'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  ['Academy', '/academy'],
  ['Planner', '/planner'],
  ['Mind AI', '/mind-ai'],
  ['The Elite Way', '/the-elite-way'],
  ['Journal', '/journal'],
  ['Novidades', '/novidades'],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><Link className="header-brand" href="/" aria-label="Elite Club, início" onClick={() => setOpen(false)}><Image src="/images/logo.jpeg" alt="Logo oficial Elite Club" width={400} height={400} priority /><span>ELITE <b>CLUB</b></span></Link><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span>{open ? 'FECHAR' : 'MENU'}</span><i className={open ? 'is-open' : ''}><b /><b /></i></button><nav id="main-navigation" className={`main-navigation${open ? ' is-open' : ''}`} aria-label="Navegação principal">{links.map(([label, href]) => <Link key={label} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<a className="login-link" href="https://www.instagram.com/elitecluub/" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Instagram <span>↗</span></a></nav></header>;
}
