// Pages Function: POST /api/contato
// Variáveis de ambiente (painel da Cloudflare; localmente, .dev.vars):
//   RESEND_API_KEY   chave da API do Resend (segredo)
//   TURNSTILE_SECRET chave secreta do Turnstile (segredo)
//   MAIL_FROM        remetente num domínio verificado no Resend, ex.: "B2B Company <site@b2b-company.com>"

const DESTINOS = {
  vendas: { email: 'vendas@b2b-company.com', rotulo: 'Vendas & Soluções' },
  tecnologia: { email: 'tecnologia@b2b-company.com', rotulo: 'Tecnologia & Soluções' },
  outro: { email: 'contato@b2b-company.com', rotulo: 'Outro assunto' },
};

const json = (corpo, status = 200) =>
  new Response(JSON.stringify(corpo), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const linha = (s) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim();

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET || !env.MAIL_FROM) {
    return json({ ok: false, erro: 'Serviço de contato não configurado.' }, 500);
  }
  if (!(request.headers.get('content-type') || '').includes('application/json')) {
    return json({ ok: false, erro: 'Requisição inválida.' }, 415);
  }
  const raw = await request.text();
  if (raw.length > 20000) return json({ ok: false, erro: 'Mensagem grande demais.' }, 413);

  let d;
  try { d = JSON.parse(raw); } catch { return json({ ok: false, erro: 'Requisição inválida.' }, 400); }

  // honeypot: campo escondido que só robôs preenchem; finge sucesso
  if (d.site) return json({ ok: true });

  const nome = linha(d.nome);
  const email = linha(d.email);
  const empresa = linha(d.empresa);
  const mensagem = String(d.mensagem ?? '').trim();
  const destino = DESTINOS[d.assunto];

  const erros = {};
  if (!destino) erros.assunto = 'Escolha um assunto.';
  if (nome.length < 2 || nome.length > 100) erros.nome = 'Informe seu nome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) erros.email = 'Informe um e-mail válido.';
  if (empresa.length > 120) erros.empresa = 'Nome da empresa grande demais.';
  if (mensagem.length < 10 || mensagem.length > 5000) erros.mensagem = 'Escreva uma mensagem de 10 a 5000 caracteres.';
  if (d.ciente !== true) erros.ciente = 'Confirme a ciência da política de privacidade.';
  if (Object.keys(erros).length) return json({ ok: false, erro: 'Confira os campos.', campos: erros }, 400);

  // Turnstile
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', String(d.token ?? ''));
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  let ts;
  try {
    ts = await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })).json();
  } catch {
    return json({ ok: false, erro: 'Não foi possível verificar o anti-spam. Tente de novo.' }, 502);
  }
  if (!ts.success) return json({ ok: false, erro: 'Verificação anti-spam falhou. Atualize a página e tente de novo.' }, 400);

  const texto = [
    `Assunto: ${destino.rotulo}`,
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Empresa: ${empresa || '(não informada)'}`,
    'Ciência da política de privacidade: sim',
    '',
    mensagem,
  ].join('\n');

  let r;
  try {
    r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [destino.email],
        reply_to: email,
        subject: `[Site] ${destino.rotulo}: ${nome}`.slice(0, 200),
        text: texto,
      }),
    });
  } catch {
    return json({ ok: false, erro: 'Não foi possível enviar agora. Tente de novo ou escreva para contato@b2b-company.com.' }, 502);
  }
  if (!r.ok) {
    // detalhe só vai para o log da Cloudflare, não para o visitante
    console.error('Resend recusou o envio', r.status, (await r.text().catch(() => '')).slice(0, 300));
    return json({ ok: false, erro: 'Não foi possível enviar agora. Tente de novo ou escreva para contato@b2b-company.com.' }, 502);
  }
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, erro: 'Método não permitido.' }, 405);
