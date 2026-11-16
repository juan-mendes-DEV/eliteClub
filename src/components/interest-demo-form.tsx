'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function InterestDemoForm() {
  return <div className="interest-form-card">
    <p className="eyebrow">FORMULÁRIO DEMONSTRATIVO</p>
    <div className="demo-alert" role="status">Demonstração: nenhum dado digitado é salvo ou enviado. A inscrição ainda não está disponível.</div>
    <form className="interest-fields" onSubmit={(event) => event.preventDefault()} aria-describedby="demo-status">
      <div className="interest-field"><label htmlFor="interest-name">Nome</label><input id="interest-name" name="name" type="text" autoComplete="name" maxLength={100} placeholder="Como podemos chamar você?" aria-describedby="demo-status" /></div>
      <div className="interest-field"><label htmlFor="interest-email">E-mail</label><input id="interest-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="voce@exemplo.com" aria-describedby="demo-status" /></div>
      <div className="interest-consent"><input id="interest-consent" name="marketingConsent" type="checkbox" aria-describedby="consent-description demo-status" /><label htmlFor="interest-consent">Quero receber comunicações de marketing da Elite Club por e-mail.</label><p id="consent-description">Consentimento opcional. Só deverá ser solicitado novamente junto a um cadastro operacional, com finalidade e frequência explicadas.</p></div>
      <button className="button interest-submit" type="submit" disabled aria-describedby="demo-status">Inscrição ainda indisponível <ArrowUpRight size={15} /></button>
    </form>
    <p id="demo-status" className="interest-demo-status">Nenhuma inscrição foi realizada. Este formulário não transmite nem armazena as informações digitadas.</p>
    <div className="interest-legal-links"><span>Documentos em elaboração:</span><Link href="/privacidade">Política de Privacidade</Link><Link href="/termos">Termos de Uso</Link></div>
  </div>;
}
