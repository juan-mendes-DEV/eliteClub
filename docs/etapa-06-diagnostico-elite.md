# Diagnóstico Elite — regras e privacidade

## Experiência

- Dez perguntas, uma por tela, distribuídas igualmente entre organização/produtividade, consistência/disciplina, aprendizado/conhecimento, comunicação/relacionamento e planejamento/objetivos.
- O visitante escolhe entre quatro preferências: `0` (não é prioridade agora ou já funciona bem), `1` (quero dar um pouco mais de atenção), `2` (quero fortalecer) e `3` (uma das primeiras prioridades).
- As alternativas descrevem foco desejado, não traços, condições clínicas ou capacidade pessoal. Não há perguntas financeiras, médicas, demográficas ou sensíveis.
- As respostas às duas perguntas de cada área são somadas. São devolvidas até duas áreas com soma maior que zero, ordenadas da maior para a menor. Empates usam sempre a ordem editorial fixa do módulo: organização, consistência, aprendizado, comunicação, planejamento.
- Se nenhuma área receber prioridade maior que zero, o resultado informa que nenhuma prioridade específica se destacou e entrega um plano geral de observação da rotina. Uma única área prioritária é combinada com atividades gerais para completar sete dias.
- Os valores internos servem apenas para ordenar as preferências explícitas do visitante. Não são apresentados como nota, percentil, avaliação científica ou diagnóstico psicológico.
- As recomendações e atividades vêm de bibliotecas editoriais locais em `src/lib/diagnostic.ts`; não há aleatoriedade, IA ou geração externa. Com as mesmas respostas, o resultado é o mesmo.

## Plano de sete dias

Com duas áreas selecionadas, as seis tarefas da biblioteca são alternadas ao longo dos dias 1–6; o dia 7 convida a uma revisão leve e à escolha de um próximo passo. Com uma prioridade, três atividades específicas são intercaladas com três atividades gerais. Sem prioridade, seis atividades gerais conduzem a um dia de reflexão. Todas as ações são sugestões que podem ser ajustadas ou ignoradas.

## Dados e privacidade nesta versão

- O reducer React guarda as respostas apenas em memória enquanto a rota está aberta.
- Não há API, analytics, cookies, localStorage, sessionStorage, autenticação ou chamada a IA.
- Reiniciar substitui o estado por um estado inicial vazio; sair da rota descarta o estado.
- Imprimir/salvar PDF usa somente `window.print()` do navegador e CSS de impressão; o site não envia o plano para um serviço.

## Testes

- `npm test`: testes unitários do motor de prioridade e do reducer de fluxo, usando o runner nativo de testes do Node 24.
- `npm run test:e2e`: Playwright cobre navegação por teclado, seleção de opções, progresso, revisão/edição, reinício, resumo de sete dias, rótulos acessíveis, redução de movimento e ausência de chamadas fetch/XHR.
- Para executar Playwright em outra máquina: `npx playwright install chromium` se ainda não houver navegador Chromium instalado.
