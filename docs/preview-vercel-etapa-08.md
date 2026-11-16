# Preview da Elite Club na Vercel

Instruções para revisão privada ou pública do código atual. O responsável da Elite Club executa o deploy; esta etapa não publica, conecta um repositório nem ativa captação.

## Configuração do projeto

- **Root Directory:** raiz deste projeto — a pasta que contém `package.json` e `package-lock.json` (no checkout local desta revisão: `/home/neo/Projetos/elite_club`). Não habilite “Include files outside the root directory”.
- **Framework Preset:** Next.js (detecção automática).
- **Build Command:** `npm run build` (padrão detectado pela Vercel também é válido).
- **Install Command:** `npm ci`, para instalar exatamente o lockfile.
- **Output Directory:** deixar o padrão do Next.js; não substituir por `out`.
- **Node.js:** use Node **24.x**, alinhado ao ambiente validado e compatível com o Next.js 16.4.6 do projeto (requisito declarado pelo pacote: Node >=20.9.0). Se a organização padronizar outra versão, valide-a primeiro e mantenha a mesma versão no desenvolvimento e na Vercel.
- **Variáveis para Preview:** nenhuma. O Diagnóstico guarda respostas somente no estado da página; não há backend, autenticação, pagamento nem serviço de IA conectado.

## Indexação, domínio e acesso

- A Vercel define `VERCEL_ENV=preview` nos Previews; a metadata global envia `noindex, nofollow`. Verifique o `<meta name="robots">` na URL gerada. Isso orienta robôs de busca, **não protege acesso** e não impede que alguém com o link abra a página.
- Se a revisão deve ficar restrita, habilite **Deployment Protection** nas configurações do projeto Vercel (por exemplo, autenticação Vercel/SSO, conforme o plano da conta) antes de compartilhar a URL e confirme que a proteção se aplica ao ambiente Preview. Para verificar: abra a URL numa janela anônima sem sessão autorizada; deve aparecer o desafio/login de proteção da Vercel, não o site. Depois, abra a mesma URL com uma conta autorizada e confirme o acesso. Se a página carregar sem autenticação, trate o Preview como público e não compartilhe dados/revisões restritos.
- `NEXT_PUBLIC_SITE_URL` só deve ser definida depois de aprovado o domínio público, como `https://www.dominio-aprovado.example`. A canonical e a URL social são emitidas somente quando `VERCEL_ENV=production` e essa variável contém uma URL HTTPS. Não a defina como URL de Preview.
- Nenhum segredo deve ser incluído neste documento, no código do cliente ou em variáveis `NEXT_PUBLIC_*`.

## Criar um Preview

**Pelo Git (mais simples):** conecte o repositório à Vercel e abra um Pull Request numa branch de revisão; a Vercel cria um Preview e informa a URL. Confirme a **Production Branch** antes de conectar: commits/pushes nessa branch podem disparar publicação de produção automaticamente. Não use a branch de produção para esta revisão.

**Pela CLI:** abra um terminal na pasta raiz descrita acima, autentique a CLI (`vercel login`) e execute `vercel` (sem `--prod`). Revise o projeto e as configurações solicitadas; o comando cria um Preview e imprime sua URL. `vercel --prod` publica produção e não faz parte deste checklist.

## Checklist de revisão no Preview

- [ ] O Preview está com a proteção de acesso planejada; `noindex` não está sendo tratado como privacidade.
- [ ] Navegue por cliques: Início → The Elite Way → Academy → Diagnóstico → Início; verifique também Journal, Novidades, voltar e avançar sem recarregar.
- [ ] Abra diretamente `/`, `/the-elite-way`, `/academy`, `/planner`, `/mind-ai`, `/diagnostico`, `/journal` e `/novidades`.
- [ ] Com acesso autorizado, confirme especialmente que abrir diretamente `/the-elite-way` e `/diagnostico` retorna a página correta (não apenas funciona após navegação interna).
- [ ] Logo oficial, fontes e links internos carregam sem erros.
- [ ] Diagnóstico: responder, revisar/editar, concluir e refazer; confirme que o plano tem sete práticas e que não é exibida nota/perfil. As respostas não devem ser transmitidas.
- [ ] Confira um resultado com dois temas e outro sem tema específico; em ambos, leia as sete práticas e verifique a relação com as escolhas ou o caráter intencionalmente geral do plano.
- [ ] Imprimir/salvar o resultado em PDF pelo navegador.
- [ ] Academy, Planner e Mind AI continuam identificados como **em planejamento / indisponíveis**.
- [ ] Journal continua sem publicar artigos que estejam em rascunho.
- [ ] Confirme `noindex, nofollow` no Preview. Em produção, confirme a canonical e `og:url` apontando apenas ao domínio aprovado.

## Pós-revisão

Não promova o Preview para produção antes da aprovação editorial e do domínio. Configure `NEXT_PUBLIC_SITE_URL` apenas na produção, depois da aprovação, e confira canonical, compartilhamento social, indexação e a branch de produção antes de qualquer publicação.
