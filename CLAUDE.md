# B2B Company: site

Contexto fixo do projeto. Leia antes de qualquer tarefa.

## O que é
Site do grupo **B2B Company**, com duas empresas. Endereço oficial hoje: **https://b2b-company-site.pages.dev** (o domínio `b2b-company.com` ainda aponta para a Wix, ver "Hospedagem e domínio").
- **B2B Vendas & Soluções:** intermediação de ingredientes alimentícios, commodities e laticínios para a indústria de alimentos e o agro.
- **B2B Tecnologia & Soluções:** portfólio de automações e estudos em Python, SQL e Claude.

## Onde as coisas estão
- `index.html`, `vendas/`, `tecnologia/`, `contato/`, `404.html`, `assets/` (css, js, favicon): site em páginas reais (HTML, CSS e JS puros), é a **referência de conteúdo**. O protótipo de página única original está no histórico do git.
- **Site publicado:** este repositório, na Cloudflare Pages, em https://b2b-company-site.pages.dev (ver "Hospedagem e domínio"). O site antigo da Wix ("Teste", publicado em 1 nov 2026) continua no ar em `b2b-company.com`, mas não é mais a referência.
- `textos-wix.md`: textos de referência (feitos para a Wix, já aplicados ao código).
- `pendencias-wix.md`: pendências do site antigo da Wix. Só importa se a Wix continuar sendo o site de `b2b-company.com`.
- `dns-antes.md`: DNS de `b2b-company.com` antes da migração (guarde, serve para conferir MX e SPF).
- `functions/api/contato.js`: Pages Function do formulário de contato (Turnstile + Resend). `.dev.vars.example` é o modelo das variáveis locais.
- `logos/`, `fotos/` (CC0, créditos em `fotos/CREDITOS.json`).
- Repositório: https://github.com/pauloferreirajr-arch/b2b-company-site (público).
- `PLANO-MIGRACAO.md`: plano da saída da Wix. Siga a próxima etapa não marcada.

## Hospedagem e domínio (estado em 3 nov 2026)
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
