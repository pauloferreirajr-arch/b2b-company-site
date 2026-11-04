# B2B Company: site

Site do grupo **B2B Company**, que reúne duas empresas (operadas pela B2B Vendas & Soluções Ltda.):

- **B2B Vendas & Soluções**: intermediação de ingredientes alimentícios, commodities e laticínios para a indústria de alimentos e o agro.
- **B2B Tecnologia & Soluções**: portfólio de automações e estudos em Python, SQL e Claude.

**No ar:** https://b2b-company-site.pages.dev (Cloudflare Pages, publicado a cada push na `main`).

## Como ver localmente

```
python3 -m http.server
```

e abra http://localhost:8000. É HTML, CSS e JavaScript puros, sem build. O formulário só envia no site publicado, porque depende da função em `functions/api/contato.js` (rodar localmente exige `wrangler pages dev` e um `.dev.vars` baseado no `.dev.vars.example`).

## Conteúdo

| Caminho | O que tem |
|---|---|
| `index.html`, `vendas/`, `tecnologia/`, `contato/`, `privacidade/`, `404.html` | As páginas do site |
| `assets/` | CSS, JavaScript e favicon |
| `functions/api/contato.js` | Função do formulário de contato (Turnstile + Resend) |
| `_headers` | Cabeçalhos de segurança (CSP etc.) e noindex dos documentos internos |
| `logos/`, `fotos/` | Logos em SVG (versão clara e escura) e fotos CC0, com autoria em `fotos/CREDITOS.json` |
| `robots.txt`, `sitemap.xml` | Para buscadores |
| `CLAUDE.md`, `PLANO-MIGRACAO.md`, `dns-antes.md` | Contexto do projeto, plano da migração da Wix e DNS antes dela |
| `textos-wix.md`, `pendencias-wix.md` | Material do site antigo da Wix, que ainda responde em `b2b-company.com` |

## Segredos

O repositório é público. Chaves (`RESEND_API_KEY`, `TURNSTILE_SECRET`, `MAIL_FROM`) ficam só nas variáveis da Cloudflare Pages, nunca no código.

## Fotos

As quatro fotos vêm do Wikimedia Commons, sob licença CC0: Jason W Lacey, Cultureel Gelderland, Tirza van Dijk e Derrick Coetzee. Detalhes em `fotos/CREDITOS.json`.
