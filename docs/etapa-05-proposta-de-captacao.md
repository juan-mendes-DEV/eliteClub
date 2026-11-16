# Etapa 05 — proposta para captação (pendente de aprovação)

## Estado atual

Não há banco, provedor de e-mail, proteção anti-spam, configuração de serviço nem variáveis de ambiente no projeto. `/novidades` é uma demonstração: não existe endpoint, persistência, envio, estado de sucesso, cookie de rastreamento ou chamada de terceiros. Os campos não são submetidos; o botão está intencionalmente desativado. A checkbox de consentimento é apenas visual e não produz consentimento válido.

Os links para Política de Privacidade e Termos apontam para páginas que identificam claramente os documentos como **em elaboração**. Devem ser substituídas por versões aprovadas antes de qualquer coleta efetiva.

## Arquitetura sugerida para aprovação

1. **Formulário**: somente nome e e-mail. Consentimento de marketing opcional, desmarcado por padrão, com texto de finalidade e um registro separado da versão do texto, data/hora e origem do aceite. Não condicionar o pedido de novidades ao consentimento de marketing sem validação jurídica.
2. **Endpoint no Next.js**: validação server-side, limites de tamanho, normalização e validação sintática; não confiar apenas em validação do browser. Segredos apenas no servidor.
3. **Proteção**: rate limit por IP com retenção mínima, campo honeypot e Cloudflare Turnstile validado no servidor. Responder genericamente e não revelar se um e-mail já existe. Evitar guardar IP além do período estritamente necessário para prevenção de abuso.
4. **Armazenamento**: tabela Postgres privada no Supabase, sem acesso público direto. Colunas mínimas sugeridas: id, nome, e-mail normalizado, consentimento (boolean), versão do texto de consentimento, data de criação e estado de confirmação/descadastro. Políticas RLS negando acesso anon/authenticated; gravação somente via endpoint com service key guardada em variável de ambiente. Definir prazo de retenção e rotina de exclusão antes do lançamento.
5. **Confirmação e e-mail**: double opt-in antes de ativar comunicações; envio só após confirmação e consentimento de marketing válido. Brevo pode ser avaliado para campanhas e confirmação. Todo e-mail deve incluir identificação do remetente e mecanismo funcional de descadastro. Não importar a lista para campanhas sem consentimento documentado.
6. **Operação**: alertas de quota, backups/exportação, processo de remoção/correção de dados, canal de contato, revisão de contrato/subprocessadores e avaliação LGPD. Testar fluxo de exclusão e descadastro antes de abrir a captação.

## Quotas e custos consultados

Consulta das páginas oficiais em 12/11/2026; preços e limites mudam e devem ser confirmados no momento da aprovação. Não foi criado conta nem conectado serviço.

| Serviço proposto | Plano avaliado | Limites consultados | Observações |
| --- | --- | --- | --- |
| Supabase Postgres | Free: US$ 0/mês | 500 MB de banco; até 2 projetos ativos; projetos pausam após uma semana de inatividade; sem backups automáticos no plano gratuito | Adequado apenas a protótipo/baixo risco após avaliar requisitos de disponibilidade e recuperação. Pro a partir de US$ 25/mês, com crédito de compute indicado na página oficial. |
| Cloudflare Turnstile | Free: US$ 0 | Até 20 widgets; desafios ilimitados; até 10 hostnames por widget; histórico de analytics de até 7 dias | Independente de usar Cloudflare CDN. A verificação do token no servidor é obrigatória. |
| Brevo | Free: US$ 0 | 300 envios/dia; até 100.000 contatos; até 2.000 contatos únicos em automações; marca Brevo nos e-mails do plano Free | Estatísticas básicas e limitações de campanha/automação. Não assumir que o plano gratuito atende entregabilidade, suporte ou conformidade necessários. |

Fontes oficiais:

- Supabase: <https://supabase.com/pricing>
- Turnstile planos: <https://developers.cloudflare.com/turnstile/plans/>
- Turnstile validação server-side: <https://developers.cloudflare.com/turnstile/get-started/server-side-validation/>
- Brevo limites Free: <https://help.brevo.com/hc/en-us/articles/208580669-What-are-the-limits-of-the-Free-plan>

## Plano de métricas sem rastreamento instalado

Não foi instalado analytics. Para uma futura avaliação, começar com números agregados e sem identificadores persistentes:

- **Visitas por canal**: dados agregados de origem/referrer; campanha identificada por UTMs apenas quando necessárias. Evitar fingerprinting e não persistir query strings que possam conter dados pessoais.
- **Cliques em CTAs**: contagem agregada por `cta_id`, origem da página e destino; sem e-mail, nome, IP ou identificador individual.
- **Abertura de artigos**: contagem agregada por slug apenas depois da aprovação/publicação. Atualmente rascunhos não têm rota pública.
- **Interesse por produto**: cliques agregados para `/academy`, `/planner` e `/mind-ai`, sem inferir perfil individual.
- **Inscrições válidas**: contar apenas registros com double opt-in confirmado; manter consentimento separado do evento analítico. Nunca contar tentativas ou checkbox meramente marcado como inscrição.

Antes de qualquer ferramenta de medição, aprovar finalidade, retenção, base legal, aviso de privacidade e necessidade de consent banner. Alternativa inicial: relatórios agregados do servidor/hospedagem com retenção curta e sem instalar pixels de publicidade.

## Critérios para ativar a captação

- Aprovar fornecedor, orçamento e responsáveis por acesso/segredos.
- Aprovar Política de Privacidade e Termos; identificar controlador e canal de atendimento.
- Aprovar texto e finalidade do consentimento e processo de descadastro/exclusão.
- Definir retenção, backup, limites de uso e resposta a incidentes.
- Implementar endpoint, proteção anti-abuso e confirmação de e-mail; testar com dados sintéticos.
- Só então habilitar o botão e divulgar a inscrição como operacional.
