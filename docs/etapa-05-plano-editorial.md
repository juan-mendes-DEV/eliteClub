# Etapa 05 — revisão editorial

## Rascunhos locais

Os textos estão em `draftArticles` dentro de `src/lib/journal.ts`. Não aparecem na listagem, não geram páginas estáticas e não têm data de publicação. `publishedArticles` permanece vazia. As rotas reservadas são:

1. `/journal/disciplina-base-verdadeira-liberdade` — **A disciplina é a base da verdadeira liberdade.** Categoria: Mentalidade e disciplina. Produtos relacionados: Elite Planner e Elite Academy.
2. `/journal/elegancia-nao-e-ostentacao-comportamento` — **Elegância não é ostentação: é comportamento.** Categoria: Comunicação e elegância. Produto relacionado: Elite Academy.
3. `/journal/transformar-objetivos-em-habitos-consistentes` — **Como transformar objetivos em hábitos consistentes.** Categoria: Produtividade. Produtos relacionados: Elite Planner e Elite Academy.

São textos originais para avaliação, não afirmações científicas nem aconselhamento profissional. Opiniões institucionais são identificadas como perspectiva da Elite Club; exemplos são ilustrativos. Nenhum autor ou dado de pesquisa foi atribuído.

## Publicação

Antes de publicar: revisão e aprovação editorial; revisar precisão, linguagem e eventuais orientações sensíveis; definir autor somente se confirmado; registrar a data real em ISO `YYYY-MM-DD`; mudar `status` para `published`; e então adicionar o item à coleção `publishedArticles`. A rota pública, cards, metadados SEO e links de navegação são gerados a partir do mesmo modelo. Não use data futura ou estimada como data de publicação.
