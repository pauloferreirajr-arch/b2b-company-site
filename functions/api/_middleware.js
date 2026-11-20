// CORS para /api/*: o site oficial (Lovable, em b2b-company.com) envia o formulário
// para a função /api/contato hospedada aqui na Cloudflare Pages.
// Só as origens abaixo podem chamar a API pelo navegador; o mesmo domínio (pages.dev) continua funcionando.

const ORIGENS = new Set([
  'https://b2b-company.com',
  'https://www.b2b-company.com',
]);

const cors = (origem) => ({
  'Access-Control-Allow-Origin': origem,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
});

export async function onRequest({ request, next }) {
  const origem = request.headers.get('Origin');
  const permitida = origem && ORIGENS.has(origem);

  if (request.method === 'OPTIONS') {
    return permitida
      ? new Response(null, { status: 204, headers: cors(origem) })
      : new Response(null, { status: 403 });
  }

  const resposta = await next();
  if (!permitida) return resposta;
  const r = new Response(resposta.body, resposta);
  for (const [k, v] of Object.entries(cors(origem))) r.headers.set(k, v);
  return r;
}
