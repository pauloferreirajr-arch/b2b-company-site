# B2B Company: site

Contexto fixo do projeto. Leia antes de qualquer tarefa.

## O que é
Site do grupo **B2B Company**, com duas empresas.

> **⚠️ Desde 20 nov 2026 o site oficial NÃO é este repositório.** `https://b2b-company.com` (e `www`) aponta para o site feito no **Lovable** (projeto `7a36bf30-9989-4e4d-8909-30d267b3cbe8`, editor https://lovable.dev/projects/7a36bf30-9989-4e4d-8909-30d267b3cbe8). Mudanças no site são feitas no Lovable. Este repositório (Cloudflare Pages, `b2b-company-site.pages.dev`) ficou como versão anterior e referência do formulário (Turnstile + Resend). Ver "Hospedagem e domínio".
- **B2B Vendas & Soluções:** intermediação de ingredientes alimentícios, commodities e laticínios para a indústria de alimentos e o agro.
- **B2B Tecnologia & Soluções:** portfólio de automações e estudos em Python, SQL e Claude.

## Onde as coisas estão
- `index.html`, `vendas/`, `tecnologia/`, `contato/`, `404.html`, `assets/` (css, js, favicon): site em páginas reais (HTML, CSS e JS puros), é a **referência de conteúdo**. O protótipo de página única original está no histórico do git.
- **Site publicado:** este repositório, na Cloudflare Pages, em https://b2b-company-site.pages.dev (ver "Hospedagem e domínio"). O site antigo da Wix ("Teste", publicado em 1 nov 2026) continua no ar em `b2b-company.com`, mas não é mais a referência.
- `textos-wix.md`: textos de referência (feitos para a Wix, já aplicados ao código).
- `pendencias-wix.md`: pendências do site antigo da Wix. Só importa se a Wix continuar sendo o site de `b2b-company.com`.
- `dns-antes.md`: DNS de `b2b-company.com` antes da migração (guarde, serve para conferir MX e SPF).
- `_headers`: cabeçalhos de segurança da Cloudflare Pages (CSP, X-Frame-Options, noindex nos `.md`). Ao incluir um recurso externo novo (script, fonte, iframe), liberar o domínio na CSP.
- **Responsável legal:** B2B Vendas & Soluções Ltda., CNPJ 58.187.240/0001-27 (aparece na política de privacidade).
- `functions/api/contato.js`: Pages Function do formulário de contato (Turnstile + Resend). `.dev.vars.example` é o modelo das variáveis locais.
- `logos/`, `fotos/` (CC0, créditos em `fotos/CREDITOS.json`).
- Repositório: https://github.com/pauloferreirajr-arch/b2b-company-site (público).
- `PLANO-MIGRACAO.md`: plano da saída da Wix. Siga a próxima etapa não marcada.

## Hospedagem e domínio (estado em 20 nov 2026)
- **Site oficial: Lovable.** Publicado e com domínio próprio conectado em Lovable → Settings → Domains (exige plano pago do Lovable).
- **Sem troca de nameservers:** o DNS continua na Wix (`ns0/ns1.wixdns.net`; Wix → Domínios → ⋮ → Manage DNS records). Em 20 nov 2026: A `@` e A `www` → `185.158.133.1` (Lovable) e TXT `_lovable` (verificação). Os A da Wix (185.230.63.x) e o www da Wix foram substituídos.
- **Não mexer:** 5 MX do Google, TXT SPF, `_dmarc` (`v=DMARC1; p=none;`), `resend._domainkey`, `send` e `rsend` (Resend). Conferido com `dig` após a troca: intactos.
- **Registro do domínio:** continua na Wix (vence 23/10/2027). Transferência para outro registrador só a partir de ~22/12/2026 (60 dias do registro) e é opcional. Não cancelar o domínio na Wix.
- **Formulário de contato (funcionando desde 20 nov 2026):** o site do Lovable (`src/components/contact-form.tsx`) envia para `https://b2b-company-site.pages.dev/api/contato` (esta Function: Turnstile + Resend). O CORS para `b2b-company.com` e `www` está em `functions/api/_middleware.js`. O widget do Turnstile (`0x4AAAAAAFyku5v0M7Njr4_v`) tem em Hostname management: `b2b-company-site.pages.dev`, `b2b-company.com`, `www.b2b-company.com`. Teste ponta a ponta feito pelo Paulo no navegador dele (o navegador automatizado do Claude é barrado pelo Turnstile, erro 600010). **Por isso este projeto Pages não pode ser apagado** enquanto o formulário depender dele.

## Site no Lovable (estado em 20 nov 2026, fim do dia)
- **Páginas reais:** `/`, `/vendas`, `/tecnologia`, `/contato` e `/privacidade`, cada uma com título, descrição, canonical e imagem de compartilhamento (1200×630) próprios. Links antigos com hash (`/#vendas`) redirecionam. `lang="pt-BR"`, sitemap em `https://b2b-company.com/sitemap.xml`, 404 em português. Publicado e conferido no ar.
- **Privacidade:** o formulário do Lovable agora aponta para `https://b2b-company.com/privacidade` (mesmo texto da página deste repositório). Se a política mudar, atualizar nos dois lugares.
- **Código:** a página fica em `src/components/site-page.tsx` (`SitePage` + `siteHead`); as rotas em `src/routes/`.
- **Pendente:** botão flutuante de WhatsApp (código pronto e testado, aguardando aplicação no Lovable) e a conexão do Lovable com o GitHub (iniciada, mas nenhum repositório foi criado; sem ela, toda mudança no site gasta créditos do Lovable).
- **Playbook interno** (como replicar este site para clientes): fica no Drive, em `05_TI_Interna/Site_b2b-company`.

## Hospedagem e domínio (histórico, estado em 3 nov 2026)
- **Cloudflare Pages**, projeto `b2b-company-site`, conectado a este repositório. **Production branch: `main`**: cada push na `main` publica em https://b2b-company-site.pages.dev. Build command vazio, output `/`. Outras branches viram preview.
- **Domínio `b2b-company.com`:** registrado na Wix (registro de 23/10/2026), com o **DNS na Wix** (`ns0/ns1.wixdns.net`) e ainda apontando para o site da Wix. A transferência para a Cloudflare não foi concluída, então a Etapa 5 do plano (apontar o domínio) está adiada. Se for retomada, trocar `https://b2b-company-site.pages.dev` por `https://b2b-company.com` em canonical, Open Graph, `sitemap.xml` e `robots.txt`.
- **Não cancelar o plano da Wix nem o domínio** sem antes apontar o domínio para a Cloudflare: o site, o DNS e os e-mails dependem dela.
- **E-mail:** Google Workspace (MX do Google). Caixa principal `paulo.ferreira@b2b-company.com`, com os aliases `contato@`, `vendas@` e `tecnologia@`. Nunca mexer nos MX e no SPF do Google sem conferir `dns-antes.md`.
- **Formulário de contato:** `/api/contato` valida os campos, confere o **Turnstile** e envia pelo **Resend** (remetente `MAIL_FROM`, domínio `b2b-company.com` verificado no Resend: DKIM `resend._domainkey`, CNAMEs `send` e `rsend`, na DNS da Wix). O assunto escolhido define o destino (`vendas@`, `tecnologia@` ou `contato@`).
- **Variáveis (Cloudflare Pages → Settings → Variables and secrets, tipo Secret):** `RESEND_API_KEY`, `TURNSTILE_SECRET` e `MAIL_FROM`. A site key do Turnstile é pública e fica em `contato/index.html`. **Secrets só valem em um deploy novo** (o "Retry deployment" do painel nem sempre gera um; um commit vazio resolve). Nunca colocar valores no repositório nem no chat.
- Teste do formulário sem digitar: abrir `/contato/`, esperar o Turnstile e chamar `fetch('/api/contato')` com o token do campo `cf-turnstile-response`. Cada token vale uma vez.

## Como trabalhar
- Idioma: português do Brasil.
- O usuário pediu **gastar o mínimo de tokens possível**. Seja direto, evite capturas de tela e releituras desnecessárias.
- Só vale se a Wix voltar a ser o site: editor da Wix pelo Chrome: clicar direto nos textos do canvas quase nunca funciona. O que funciona é selecionar a seção e abrir o **Quick Edit** (lápis). Nos campos de parágrafo, clique, espere 1 segundo, `cmd+a` e digite; use `Return` para nova linha.
- O botão **Save** da Wix só guarda o rascunho. Mudanças só vão ao ar com **Publish**, e publicar só quando o usuário pedir.
- Depois de editar na Wix, salve e recarregue o editor para conferir. Já houve edição perdida por não salvar.
- Elementos de app (formulário, rodapé compartilhado) não respondem bem a cliques por coordenada. Deixar para o usuário.
- Commit e push só quando o usuário pedir.

## Segurança
- Nunca guardar senhas, chaves ou tokens no repositório. Ele é público.
- Repositórios privados do usuário (`projeto-organizador`, `bot-faq`, `analisador-docs`) não devem ganhar link no portfólio.
- Links do GitHub no portfólio: só `mini-saas-urls` e `Dashboard.LPI.Mercosul` (públicos).
