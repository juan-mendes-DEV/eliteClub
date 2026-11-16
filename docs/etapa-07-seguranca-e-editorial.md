# Etapa 07 — Segurança de dependências e revisão editorial

## 1. Relatório de segurança

**Auditoria em 13 nov. 2026** — lockfile v3 (`package-lock.json`), `npm audit` e `npm audit --omit=dev`.

| Escopo | Resultado |
| --- | --- |
| Árvore completa (`npm audit`) | 7 ocorrências moderadas; 0 altas/críticas |
| Produção (`npm audit --omit=dev`) | 0 vulnerabilidades |
| Dependências diretas afetadas | Nenhuma |
| Correção aplicada nesta etapa | Nenhuma |

As sete ocorrências correspondem a seis entradas transitivas vulneráveis mais o metapacote `typescript-eslint`: `minimatch`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/parser`, `@typescript-eslint/type-utils`, `@typescript-eslint/utils`, `@typescript-eslint/eslint-plugin` e `typescript-eslint`. O caminho comum começa em `eslint-config-next@16.4.6` → `typescript-eslint@8.72.2` → `@typescript-eslint/typescript-estree@8.72.2` → `minimatch@10.2.6`.

O advisory é **GHSA-g3hv-75wg-m249** (CWE-405), “potential denial of service via globparts amplification”. A faixa reportada pelo audit é `minimatch >=7.0.0 <11.0.1`; o caminho vulnerável está instalado sob o parser TypeScript, portanto pertence às ferramentas de lint/desenvolvimento, não à árvore de produção. A vulnerabilidade é moderada e não foi identificada como alcançável pelo tráfego do site em produção.

`npm audit fix --dry-run --json` não propôs mudanças (0 pacotes adicionados/alterados). A versão disponível de `eslint-config-next` na linha 16 termina em `16.4.6`; atualizar Next fora dessa linha não é indicado como correção incidental. Forçar `minimatch@11.0.1` por override atravessaria a faixa major declarada pelo consumidor que solicita `^10`, e não foi validado. Não executar `npm audit fix` ou instalar override sem uma versão compatível do `typescript-eslint`/`eslint-config-next` e testes de lint, build e suite.

**Recomendação:** acompanhar o advisory e atualizar o conjunto de lint quando houver release compatível. Reavaliar `npm audit` e `npm audit --omit=dev` após a atualização. A auditoria não revelou risco de dependência de produção no estado atual.

## 2. Parecer editorial para aprovação humana

Os textos abaixo preservam os temas, a perspectiva e exemplos dos rascunhos existentes. Foram ajustados para leitura mais direta, linguagem brasileira acessível e distinção explícita entre perspectiva editorial, sugestão prática e afirmação factual. Não foram acrescentadas pesquisas, autores ou fontes. Nenhum texto faz promessa de resultado ou apresenta aconselhamento como garantia.

**Originalidade:** a revisão preserva formulações e exemplos dos originais e não introduz citações. Esta revisão editorial não equivale a uma busca de similaridade/plágio; recomenda-se uma checagem editorial final antes da aprovação.

### Artigo 1 — A disciplina como caminho para a liberdade

- **Slug:** `disciplina-base-verdadeira-liberdade`
- **Descrição SEO:** Entenda como compromissos escolhidos com consciência podem abrir espaço para mais liberdade no cotidiano.
- **Resumo:** Disciplina não precisa significar rigidez. Uma estrutura simples, escolhida por você e ajustada à vida real, pode reduzir decisões repetidas e facilitar ações alinhadas às suas prioridades.
- **Categoria:** Mentalidade e disciplina
- **Leitura estimada:** 2 min (246 palavras, estimativa de 200 palavras/minuto)
- **Capa sugerida:** Uma agenda aberta sobre uma mesa de madeira, luz natural suave e poucos objetos; sem relógios de luxo ou estética de produtividade extrema.
- **Links internos:** The Elite Way (`/the-elite-way`); Elite Planner — em planejamento (`/planner`).
- **CTA discreto:** “Descubra quais hábitos você deseja fortalecer.” → `/diagnostico`.
- **Referências:** não há afirmações de pesquisa ou dados externos. A relação entre estrutura e ação é apresentada como reflexão e exemplo, não como resultado garantido.

**Texto revisado**

Liberdade costuma ser associada à ausência de limites. No cotidiano, porém, depender apenas da vontade do momento pode nos deixar diante das mesmas decisões, distrações e urgências. Uma estrutura escolhida com consciência pode liberar atenção para aquilo que realmente importa.

Imagine alguém que quer voltar a estudar depois do trabalho. Se a decisão precisa ser tomada do zero toda noite, o cansaço pode virar uma negociação. Deixar o material separado, escolher um horário possível e começar com vinte minutos reduz o atrito inicial. Nesse caso, disciplina não é rigidez: é preparar o caminho para uma escolha que a própria pessoa considera valiosa.

Isso não significa que a mesma rotina funcione para todo mundo. Horários, responsabilidades, saúde e recursos variam. Um plano útil precisa caber na vida real e pode mudar quando as circunstâncias mudam. A intenção não é cumprir uma sequência perfeita, mas definir um próximo passo claro o bastante para ser retomado.

Experimente escolher uma prioridade para a semana e decidir quando cuidar dela. Em vez de “vou me organizar melhor”, tente: “na quarta-feira, depois do café, vou revisar as três tarefas mais importantes”. No fim, observe o que ajudou e o que atrapalhou, sem transformar um imprevisto em julgamento sobre si.

Na perspectiva editorial da Elite Club, disciplina é uma forma de cuidado com os compromissos que escolhemos. Ela não garante resultados nem elimina obstáculos. Pode ajudar a agir de acordo com as próprias prioridades e abrir espaço para menos decisões no piloto automático.

### Artigo 2 — Elegância não é ostentação: é comportamento

- **Slug:** `elegancia-nao-e-ostentacao-comportamento`
- **Descrição SEO:** Uma reflexão prática sobre presença, respeito e cuidado nas interações — sem confundir elegância com aparência ou consumo.
- **Resumo:** Uma perspectiva editorial sobre elegância para além da aparência: escuta, clareza, respeito ao contexto e atenção ao efeito das próprias escolhas nas interações.
- **Categoria:** Comunicação e elegância
- **Leitura estimada:** 2 min (234 palavras, estimativa de 200 palavras/minuto)
- **Capa sugerida:** Uma cadeira vazia junto a uma mesa de reunião simples, luz natural lateral e composição acolhedora; evitar marcas, joias ou sinais de luxo.
- **Links internos:** The Elite Way (`/the-elite-way`); Elite Academy — em planejamento (`/academy`).
- **CTA discreto:** “Conheça os princípios The Elite Way.” → `/the-elite-way`.
- **Referências:** texto explicitamente identificado como perspectiva editorial, sem alegação de definição universal ou dado externo.

**Texto revisado**

Elegância pode aparecer na roupa, na arquitetura ou em um objeto bem-feito. Reduzi-la, porém, a preço e aparência deixa de lado outra dimensão: a maneira como tratamos as pessoas. Nesta reflexão, elegância é uma escolha de comportamento, expressa em cuidado com o contexto, clareza e respeito.

Em uma conversa, isso pode ser escutar até o fim, discordar sem humilhar e reconhecer quando não se sabe algo. Em uma reunião, pode significar chegar preparado, respeitar o tempo combinado e abrir espaço para outras pessoas contribuírem. São gestos observáveis que não dependem de um guarda-roupa específico nem de um ambiente de prestígio.

Na escrita, uma mensagem com contexto suficiente e um pedido claro pode evitar que alguém precise adivinhar o que fazer. Se o assunto for delicado, vale considerar também o canal e o momento. A forma não substitui o conteúdo, mas pode tornar a intenção mais compreensível.

Antes de uma interação, experimente perguntar: “O que a outra pessoa precisa compreender para que esta conversa seja respeitosa e produtiva?”. Depois, confira se o tom combina com sua intenção. Ser cordial não exige concordar com tudo; ser direto não exige ser áspero.

Esta é uma perspectiva editorial da Elite Club, não uma definição universal de elegância. Contextos diferentes têm códigos próprios, que também podem ser questionados. O princípio proposto aqui é simples: cuidado não é espetáculo; é atenção ao efeito das nossas escolhas sobre as outras pessoas.

### Artigo 3 — Como transformar objetivos em hábitos consistentes

- **Slug:** `transformar-objetivos-em-habitos-consistentes`
- **Descrição SEO:** Um método prático para tornar objetivos mais claros, escolher uma ação pequena e revisar o plano sem buscar perfeição.
- **Resumo:** Um roteiro flexível para sair de uma intenção ampla, escolher uma ação observável, preparar o começo e ajustar o plano conforme a rotina — sem tratar consistência como perfeição.
- **Categoria:** Produtividade
- **Leitura estimada:** 2 min (310 palavras, estimativa de 200 palavras/minuto)
- **Capa sugerida:** Um par de tênis ao lado de uma agenda com poucos compromissos marcados, em ambiente cotidiano e acessível; sem estética de transformação física ou promessa de resultado.
- **Links internos:** Elite Planner — em planejamento (`/planner`); Elite Academy — em planejamento (`/academy`).
- **CTA discreto:** “Comece seu plano de evolução de sete dias.” → `/diagnostico`.
- **Referências:** exemplo de caminhada marcado como ilustrativo e condicionado à rotina e à saúde; recomendação para priorizar segurança e orientação adequada. Não são citadas pesquisas.

**Texto revisado**

Um objetivo aponta uma direção; um hábito é uma ação que pode ser repetida. “Quero aprender um idioma” expressa uma intenção, mas ainda deixa perguntas em aberto: quando começar, por quanto tempo e qual será a primeira atividade? Traduzir a intenção em uma ação concreta ajuda a aproximar plano e cotidiano.

Comece definindo o que “avançar” significa para você. Em vez de “quero me movimentar mais”, alguém pode escolher “caminhar por vinte minutos três vezes nesta semana”, se isso for adequado à sua rotina e às suas condições de saúde. Outra pessoa pode precisar de uma meta diferente. O exemplo é um ponto de partida, não uma prescrição.

Depois, associe a ação a um momento ou situação que já exista: “depois do almoço de terça, vou caminhar no quarteirão”. Prepare o que puder, como separar os tênis. Se a versão planejada não couber em um dia corrido, escolha uma alternativa menor — talvez uma caminhada mais curta — sem tratá-la como fracasso nem como substituta permanente do plano.

Registrar o que aconteceu pode revelar obstáculos concretos. No fim da semana, anote quando foi fácil começar, o que interferiu e qual ajuste parece possível. Se a meta não coube, experimente outra frequência ou horário. Ajustar o plano não significa abandonar o objetivo.

Consistência não é perfeição. Uma interrupção não apaga o que veio antes; pode informar sobre o contexto e sobre o tamanho do plano. Se houver dor, exaustão ou uma orientação profissional relevante, priorize a segurança e procure o apoio adequado em vez de insistir em uma rotina genérica.

A proposta editorial da Elite Club é tratar hábitos como ferramentas a serviço de objetivos pessoais, não como medida de valor. Escolha uma ação observável, encontre um lugar possível para ela na agenda e revise o plano com honestidade. O próximo passo precisa ser viável para começar e significativo para você.

## 3. Pendências antes de publicação

- Aprovação explícita de título, texto, categoria, resumo, descrição SEO, imagem e CTA pelos responsáveis editoriais.
- Produção/licenciamento das capas com texto alternativo revisado.
- Checagem final de originalidade e revisão de marca/voz.
- Definição manual de data de publicação. `publishedAt` permanece `null` em todos os rascunhos.
- Só após aprovação, mover o artigo para `publishedArticles` e definir data real; slug dinâmico, sitemap/SEO e links públicos devem ser verificados nessa etapa.
- CTA de elegância aponta para os princípios The Elite Way, conforme o direcionamento específico; não exige cadastro.

## 4. Recomendação para a Etapa 08

Realizar o ciclo de aprovação editorial e auditoria final de conteúdo/capas; tratar a atualização das ferramentas de lint quando existir patch compatível para o advisory; depois, publicar manualmente apenas os artigos aprovados e verificar metadados, sitemap, acessibilidade e renderização social. Nenhuma publicação foi feita nesta etapa.
