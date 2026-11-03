# Plano de migração: Wix → código próprio (Cloudflare Pages)

Objetivo: tirar o site do ar na Wix e publicar o próprio código deste repositório em b2b-company.com, sem derrubar o site nem os e-mails do domínio.

**Como usar este arquivo:** execute uma etapa por sessão do Claude Code. Cada etapa tem um prompt pronto. Ao terminar, marque os itens `[x]` e faça o commit. A Wix continua no ar até a etapa 5 ser validada.

Legenda: 🤖 o Claude Code faz · 👤 só você pode fazer (login, pagamento, DNS)

---

## Decisão de hospedagem: Cloudflare Pages

| | GitHub Pages | Vercel (Hobby, grátis) | Cloudflare Pages (grátis) |
|---|---|---|---|
| Uso comercial no plano grátis | Não é feito para hospedar negócio ou e-commerce | **Proibido** (site de empresa conta como comercial) | Permitido |
| Funções de servidor (formulário, webhook de pagamento) | Não tem | Tem | Tem (Pages Functions) |
| Segredos (chaves de API) fora do código | Não | Sim | Sim |
| Banda | Limitada | 100 GB/mês | Sem limite |
| Plano pago, se precisar | — | US$ 20/usuário/mês | US$ 5/mês (Workers Paid) |

---

## Etapa 0: preparar o repositório 🤖
- [x] Criar a branch `migracao`
- [x] Adicionar ao `CLAUDE.md`, em "Onde as coisas estão": `PLANO-MIGRACAO.md: plano da saída da Wix. Siga a próxima etapa não marcada.`
- [x] Atualizar `.gitignore`: `.DS_Store`, `.env`, `.dev.vars`, `node_modules/`, `.wrangler/`

> **Prompt:** "Leia o PLANO-MIGRACAO.md e execute a Etapa 0."

## Etapa 1: transformar o protótipo em site de verdade 🤖
Hoje o `index.html` tem 1,2 MB porque as quatro fotos estão embutidas em base64, e as quatro "páginas" são trocadas por JavaScript.
- [ ] Separar em páginas reais com URL própria: `/`, `/vendas/`, `/tecnologia/`, `/contato/` (melhor para o Google e para links diretos)
- [ ] Extrair o CSS para `assets/css/site.css` e o JS para `assets/js/site.js`
- [ ] Trocar as imagens base64 pelos arquivos de `fotos/`, com `loading="lazy"` e `width`/`height`
- [ ] Remover a meta `claude:viewport-fit-sides` (só servia para a pré-visualização)
- [ ] Em cada página: `<title>` próprio, `meta description`, Open Graph (título, descrição, imagem), favicon a partir de `logos/`
- [ ] Criar `404.html`, `robots.txt` e `sitemap.xml`
- [ ] Conferir o resultado num navegador local (`python3 -m http.server`) em tela de celular e de desktop

> **Prompt:** "Execute a Etapa 1 do PLANO-MIGRACAO.md. Preserve o visual e os textos do protótipo."

## Etapa 2: conteúdo final 🤖
O conteúdo de referência é o `textos-wix.md`, que já tem as correções de `pendencias-wix.md`.
- [ ] Conferir cada página contra o `textos-wix.md` e aplicar o que faltar (rodapé com os três e-mails, GitHub e créditos das fotos; Contato sem a seção "Como funciona")
- [ ] Portfólio: link do GitHub só nos projetos 1 e 8 (regra do `CLAUDE.md`)
- [ ] Criar a página `/privacidade/`: quais dados o formulário coleta, para quê, por quanto tempo, e como pedir exclusão (LGPD). Linkar no rodapé e embaixo do formulário
- [ ] 👤 Revisar a política de privacidade antes de publicar

> **Prompt:** "Execute a Etapa 2 do PLANO-MIGRACAO.md."

## Etapa 3: formulário de contato funcionando 🤖 + 👤
Site estático não envia e-mail sozinho. Caminho recomendado: uma Pages Function (`functions/api/contato.js`) que recebe o formulário e envia por um serviço de e-mail transacional (ex.: Resend), com anti-spam Cloudflare Turnstile.
- [ ] 🤖 Formulário com: nome, e-mail, empresa, assunto (as três opções do `textos-wix.md`), mensagem e checkbox de ciência da política de privacidade
- [ ] 🤖 Function que valida os campos, verifica o Turnstile e envia o e-mail para o endereço certo conforme o assunto (vendas@, tecnologia@ ou contato@)
- [ ] 🤖 Mensagens de sucesso e de erro na página, sem recarregar
- [ ] 👤 Criar a conta no serviço de e-mail e no Turnstile. **As chaves vão só no painel da Cloudflare (variáveis de ambiente), nunca no repositório, que é público.** Para testes locais, use `.dev.vars` (já no `.gitignore`)

> **Prompt:** "Execute a Etapa 3 do PLANO-MIGRACAO.md. Me diga quais variáveis de ambiente eu preciso criar."

## Etapa 4: publicar em endereço de teste 👤 + 🤖
- [ ] 👤 Criar conta grátis na Cloudflare
- [ ] 👤 Workers & Pages → Create → Pages → conectar o repositório `b2b-company-site` do GitHub. Build command: vazio. Output directory: `/`
- [ ] 👤 Cadastrar as variáveis da Etapa 3 em Settings → Environment variables
- [ ] 🤖 Testar o endereço `*.pages.dev`: todas as páginas, links, formulário (enviar um teste para cada assunto), 404, celular
- [ ] 👤 Aprovar o resultado e fazer o merge da branch `migracao` na `main`

> **Prompt:** "O site está em <URL>.pages.dev. Execute os testes da Etapa 4 e liste o que falhar."

## Etapa 5: apontar o domínio ⚠️ etapa crítica 👤 + 🤖
**Risco principal: derrubar os e-mails** (contato@, vendas@, tecnologia@). Se o DNS for trocado sem copiar os registros de e-mail, as mensagens param de chegar.
- [ ] 👤 Descobrir onde o domínio foi registrado (Wix ou outro registrador) e onde está o DNS hoje. No Wix: Domínios → b2b-company.com
- [ ] 👤 Descobrir quem hospeda os e-mails (Google Workspace, Microsoft, Wix/outro)
- [ ] 🤖 Levantar todos os registros DNS atuais (`dig b2b-company.com MX/TXT/A/CNAME`, `dig www.b2b-company.com`) e salvar em `dns-antes.md`
- [ ] 👤 Adicionar o domínio na Cloudflare e conferir se **todos** os registros MX, SPF (TXT), DKIM e DMARC foram copiados
- [ ] 👤 Trocar os nameservers no registrador para os da Cloudflare (ou, se o domínio estiver preso na Wix, transferir o registro primeiro)
- [ ] 👤 No projeto Pages: Custom domains → `b2b-company.com` e `www.b2b-company.com`
- [ ] 🤖 Validar: site abre com HTTPS nas duas versões, `www` redireciona para a principal, e-mail de teste chega nas três caixas
- [ ] Fazer num dia de pouco movimento. A propagação pode levar algumas horas

> **Prompt:** "Execute a parte de levantamento da Etapa 5 e me diga, passo a passo, o que eu preciso fazer no painel."

## Etapa 6: encerrar a Wix 👤 + 🤖
- [ ] Esperar 1 a 2 semanas com o site novo no ar e os e-mails funcionando
- [ ] 👤 Cancelar o plano premium da Wix (sem cancelar o domínio, se ele ainda estiver registrado lá)
- [ ] 🤖 Mover `textos-wix.md` e `pendencias-wix.md` para `arquivo/`; atualizar `README.md` e `CLAUDE.md` (o site publicado agora é este código, publicado pela Cloudflare a cada push na `main`)

---

## Depois da migração (não começar antes)
1. **Captura de leads em banco de dados:** a Function do formulário passa a gravar também no Supabase (tabela `leads`, com acesso protegido por RLS). Pré-requisito: política de privacidade atualizada.
2. **Área de clientes / banco de clientes:** login com Supabase Auth. Só quando houver uso real definido.
3. **Loja:** só depois de responder "o que exatamente se vende com preço fixo, sem cotação?". Pagamento sempre por gateway pronto (Mercado Pago ou Stripe), confirmação por webhook numa Function. Nunca guardar dados de cartão.

## Regras que valem para todas as etapas
- O repositório é público: nenhuma chave, senha ou token em arquivo ou no histórico.
- Uma etapa por vez, com commit ao final.
- A Wix só é desligada depois da Etapa 5 validada.
