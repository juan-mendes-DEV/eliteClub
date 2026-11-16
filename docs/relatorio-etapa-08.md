# Elite Club — Relatório da Etapa 08

## O que foi entregue

- Corrigido o ciclo de `IntersectionObserver` para observar elementos após cada mudança de pathname e desconectar a observação anterior. Conteúdo deixa de ser escondido com `opacity: 0`; a animação é apenas decorativa e respeita movimento reduzido.
- Home e `/the-elite-way` apresentam a distinção estoica entre julgamentos/escolhas/ações e resultados não garantidos, as quatro virtudes, exemplos contemporâneos e os sete pilares como aplicações próprias da marca.
- O Diagnóstico Elite usa dez dilemas atuais, opções sem alternativa moral óbvia, revisão, reinício em memória, resultado por sinais editoriais (até dois temas) e plano determinístico de sete práticas. Não gera nota, ranking, perfil ou avaliação psicológica.
- Na revisão 08.1, as práticas dos temas priorizados passaram a ser selecionadas a partir dos dilemas exatos que sinalizaram cada tema, reduzindo recomendações genéricas e repetição temática.
- Canonical/URL social só aparecem com `VERCEL_ENV=production` e `NEXT_PUBLIC_SITE_URL` HTTPS aprovado. Preview recebe `noindex, nofollow`; isso não substitui proteção de acesso.
- Instruções de Preview: [`preview-vercel-etapa-08.md`](./preview-vercel-etapa-08.md).

## Diagnóstico da falha de navegação

O `ScrollReveal` original consultava `[data-reveal]` uma única vez ao montar o layout. Como o layout persiste no App Router, o observer não acompanhava elementos renderizados nas próximas rotas. Em produção local, após navegar por cliques, o heading de The Elite Way estava presente no DOM, com `visibility: visible`, mas `opacity: 0`; `html.motion-ready` estava ativo e novos elementos não tinham a classe `is-revealed`. Isso foi reproduzido em Chromium 154 e Firefox gerenciado pelo Playwright 159, sem erro de hidratação ou request de rota com falha. A observação agora reinicia por pathname, e a opacidade de conteúdo não cai a zero.

## Validação

Ambiente local: Node 24.19.0, npm 12.0.2, Next.js 16.4.6, Chromium 154 e Firefox gerenciado pelo Playwright 159. O Firefox ESR 140 instalado pelo sistema não iniciou pelo protocolo do Playwright; por isso a cobertura Firefox usa o browser compatível instalado pelo Playwright. O usuário ainda deve confirmar no Firefox/Kali de seu dispositivo real.

- Unit tests: 14 testes passaram (prioridade simples, empate e múltiplas prioridades, plano geral, fluxo, revisão, reinício e artigos em rascunho).
- Lint e typecheck: passaram depois da remoção do diretório transitório de desenvolvimento que o ESLint havia incluído.
- Playwright em build de produção local, serial: **20 testes passaram** (10 em Chromium e 10 em Firefox gerenciado), incluindo navegação App Router sem novas requisições de documento, histórico, dilemas, revisão, reinício, impressão e CTA responsivo.
- Revalidação 08.1 após personalizar as práticas e fortalecer a regressão: **16 testes afetados passaram** (12 do Diagnóstico e 4 de navegação/hero), em Chromium e Firefox gerenciado. O teste de navegação multiplica a opacidade computada do elemento por todos os ancestrais e verifica `display`/`visibility`; ele também confirma uma única requisição `document` (a entrada inicial).
- Firefox ESR do sistema foi dirigido por geckodriver/WebDriver porque não inicia pelo protocolo do Playwright: **Firefox 140.15.0 ESR** completou os cliques Início → The Elite Way → Academy → Diagnóstico → Início → Journal → Novidades e voltar/avançar. Nas oito rotas/estados, o título e ancestrais ficaram renderizados com opacidade efetiva >= 0,95 e a Performance API manteve uma navegação de documento. Não reproduzi uma falha no ESR nesta validação.
- A primeira execução E2E em dev teve 16/18 aprovações; dois testes atingiram timeout enquanto o Next estava compilando rotas paralelamente. O dev inicial também tinha HMR inconsistente, por isso a evidência conclusiva do bug e o gate E2E final são da build de produção local.
- Impressão: testes automatizados confirmaram chamada local de `window.print` e CSS de impressão em ambos os browsers. A conferência visual de um PDF baixado fica para o Preview/revisor.
- Hero: CTA principal permaneceu dentro da área de conteúdo nos quatro viewports, sem overflow horizontal. Limites Y no viewport: 360×800 `570–617`; 768×1024 `661–708`; 1366×768 `597–644`; 1440×900 `663–710` px. O teste Playwright verifica diretamente esses limites.

## Capturas da Etapa 08

As capturas ficam em [`../screenshots/etapa-08/`](../screenshots/etapa-08/): home em 360, 768, 1366 e 1440 px, além de The Elite Way e Diagnóstico em desktop. [`hero-audit.json`](../screenshots/etapa-08/hero-audit.json) registra as medidas do CTA. Foram feitas sobre servidor de produção local.

## Exemplo de plano de sete dias

Exemplo determinístico para as escolhas “a atenção pública pesa no meu julgamento” (aprovação pública) e “ser visto faz parte do que desejo” (consumo):

1. Escolha critérios de qualidade e utilidade que importariam mesmo com pouca atenção pública.
2. Registre o valor que uma compra teria para você sem plateia.
3. Compare a intenção de uma publicação com o que ela comunica, sem usar o alcance como medida única.
4. Considere uso, prazer esperado e custo dentro da sua realidade.
5. Se desejar feedback, escolha uma pessoa ou pergunta que ajude a melhorar sem transformar aprovação em critério único.
6. Se a compra não for urgente, marque quando vai revê-la e observe se o desejo continua.
7. Releia as práticas sem se julgar e escolha o próximo passo.

O plano geral, quando nenhuma resposta sinaliza um foco, foi conferido: 1) separar fato/interpretação; 2) proteger dez minutos de atenção; 3) tornar um compromisso possível; 4) agir sem controlar a resposta; 5) examinar valor, uso e custo de um desejo; 6) escolher como participar de uma conversa; 7) revisar a semana. Não há sugestão vazia, e as seis primeiras práticas cobrem situações diferentes; o sétimo dia é uma revisão comum aos resultados.

## Limites da entrega

Não houve commit, push, deploy, ativação de captação ou implementação de pagamentos, autenticação ou IA. A URL social da Stanford Encyclopedia e a referência a Epicteto são links de leitura; a formulação indicada no site está identificada como paráfrase, não citação literal. O Preview remoto e a proteção de acesso ainda precisam ser configurados e conferidos pelo responsável da Elite Club. O fluxo foi automatizado em Firefox ESR por geckodriver, mas uma confirmação manual no Firefox/Kali exato do usuário continua recomendada por diferenças de versão, extensões e preferências locais.
