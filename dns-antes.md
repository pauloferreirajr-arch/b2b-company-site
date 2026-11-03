# DNS de b2b-company.com antes da migração

Levantado em 3 nov 2026 com `dig`. Não apague: serve para conferir se a Cloudflare copiou tudo.

- **Registrador:** Wix.com Ltd. (registrado em 23/10/2026, vence em 23/10/2027)
- **DNS (nameservers):** `ns0.wixdns.net`, `ns1.wixdns.net`
- **E-mail:** Google Workspace (MX do Google)

| Tipo | Nome | Valor |
|---|---|---|
| A | b2b-company.com | 185.230.63.186, 185.230.63.171, 185.230.63.107 (servidores da Wix) |
| CNAME | www | cdn3.wixdns.net / cfd.wixdns.net (Wix) |
| MX | b2b-company.com | 10 aspmx.l.google.com |
| MX | b2b-company.com | 20 alt1.aspmx.l.google.com |
| MX | b2b-company.com | 30 alt2.aspmx.l.google.com |
| MX | b2b-company.com | 40 alt3.aspmx.l.google.com |
| MX | b2b-company.com | 50 alt4.aspmx.l.google.com |
| TXT | b2b-company.com | `v=spf1 include:_spf.google.com ~all` |

Não encontrados: AAAA, CAA, DMARC (`_dmarc`), DKIM (`google._domainkey`).

**Registros que a Cloudflare deve ter, sem alterar:** os 5 MX e o TXT de SPF. Os registros A e www da Wix são substituídos pelo Cloudflare Pages.
**Conferir no painel do Google Workspace:** se o DKIM está ativado (hoje não aparece no DNS).
