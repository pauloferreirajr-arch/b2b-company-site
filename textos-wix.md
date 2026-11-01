# Textos para colar na Wix

Textos extraídos do `index.html`. Uma seção por página do site.

## Vendas & Soluções

### Hero
- Rótulo: `Para clientes e parceiros`
- Subtítulo: `Conectamos quem produz a quem precisa de matéria-prima na indústria de alimentos e no agro, com intermediação de ponta a ponta.`
- Botões: `Pedir cotação` e `Propor parceria`

### O que intermediamos
Título: `Três linhas de produto.`

| Título | Descrição |
|---|---|
| Ingredientes alimentícios | Matérias-primas e insumos para a indústria de alimentos. |
| Commodities agrícolas | Produtos do agro negociados em volume, com preço e prazo comparados. |
| Leite e derivados | Laticínios e ingredientes lácteos para a indústria. |

### Como funciona
Título: `Da necessidade ao fechamento.`

| Passo | Título | Descrição |
|---|---|---|
| 1 | Você envia a necessidade | Produto, volume, prazo e região de entrega. |
| 2 | Buscamos as ofertas | Consultamos fornecedores e comparamos condições. |
| 3 | Você recebe a proposta | Preço, condições e prazos para decidir. |
| 4 | Acompanhamos o fechamento | Da negociação até a entrega. |

### Bloco final
- Título: `Compradores e fornecedores, o mesmo ponto de partida.`
- Texto: `Quem compra pede cotação. Quem fornece apresenta produtos e condições. Os dois começam pelo formulário.`
- Botão: `Falar com Vendas`

## Tecnologia & Soluções

### Áreas de estudo
Título: `Onde a prática acontece.`

| Ícone | Título | Descrição |
|---|---|---|
| .py | Python | Scripts de automação, tratamento de dados e integrações. |
| SQL | SQL | Consultas, modelagem e análise de dados. |
| AI | Claude | IA em fluxos de trabalho, agentes e geração de conteúdo. |

### Código de exemplo
Legenda: `resumo_vendas.py · exemplo`

```python
import pandas as pd

def resumo_vendas(arquivo):
    df = pd.read_excel(arquivo)
    return df.groupby("produto")["valor"].sum()
```

```sql
-- e o equivalente em SQL
SELECT produto, SUM(valor) AS total
FROM vendas
GROUP BY produto
ORDER BY total DESC;
```

### Portfólio
Texto de abertura: `Projetos de estudo e prática. O código dos que estão no GitHub fica disponível para consulta.`

Filtros: `Todos` · `Python` · `SQL` · `Claude`

| # | Título | Descrição | Tags | Link |
|---|---|---|---|---|
| 1 | Encurtador de URLs com analytics | Cria links curtos, redireciona para a URL original e conta os cliques de cada link, com página de estatísticas. | Python, FastAPI, SQLAlchemy, SQLite | Ver no GitHub → |
| 2 | Analisador de documentos com Claude | Lê textos e PDFs, envia ao Claude e gera um relatório em Markdown para cada documento. | Python, API do Claude, PyPDF2 | — |
| 3 | Bot de FAQ com a API do Claude | Responde uma lista de perguntas com o Claude, usando um arquivo de contexto que define o conhecimento base. | Python, API do Claude | — |
| 4 | Organizador de agenda | Todo dia às 6h, de segunda a sábado, lê a agenda Google e a do Mac e monta a lista de atividades do dia em PDF e no Notion. | Python, Google Calendar, Notion | — |
| 5 | Organizador de arquivos de analytics | Renomeia exportações CSV com timestamp e organiza em pastas mensais, seguindo um padrão fixo de nomes. | Python | — |
| 6 | Curso de SQL aplicado a Python | Oito módulos em notebooks, do primeiro SELECT a uma análise de vendas completa. | MySQL, pandas, SQLAlchemy, Jupyter | — |
| 7 | Consolidação de contatos comerciais | Reúne contatos de e-mail, WhatsApp e do celular em um banco de dados único, sem duplicar registros. | Python, Notion, Gmail | — |
| 8 | Dashboard de importações de leite em pó | Painel em HTML com as importações brasileiras de leite em pó. | HTML, Dados | Ver no GitHub → |
| 9 | Página de apresentação pessoal | Página estática em HTML, CSS e JavaScript puros, sem build, pronta para o GitHub Pages. | HTML, CSS, JavaScript | — |

O protótipo só mostra "Ver no GitHub →" nos projetos 1 e 8.

### Bloco final
- Título: `Tem um processo para automatizar?`
- Texto: `Conte o que se repete na sua rotina e avaliamos juntos se vale automatizar.`
- Botão: `Falar com Tecnologia`

## Contato
- Título: `Fale com a B2B Company.`
- Subtítulo: `Escolha o assunto e a mensagem chega à empresa certa.`
- Endereços:
  - Geral: `contato@b2b-company.com`
  - Vendas & Soluções: `vendas@b2b-company.com`
  - Tecnologia & Soluções: `tecnologia@b2b-company.com`
  - GitHub: `github.com/pauloferreirajr-arch`
- Apagar a seção "Como funciona", copiada por engano da página Vendas.

### Formulário
- Remover o campo **Sobrenome**.
- Campo **Assunto**, com três opções:
  ```
  Vendas & Soluções: cotação ou parceria
  Tecnologia & Soluções: projeto ou automação
  Outro assunto
  ```

## Início

### O que o grupo cobre
Título: `O que o grupo cobre` (já aplicado na Wix). Subtítulo: `Três frentes, uma só conversa.` (já existe)

| Título | Descrição |
|---|---|
| Agro e commodities | Grãos e produtos agrícolas negociados em volume, da origem ao comprador. |
| Leite e derivados | Laticínios e ingredientes lácteos para a indústria de alimentos. |
| Automação e dados | Soluções em Python, SQL e Claude para tirar tarefas repetitivas do caminho. |

### As duas empresas do grupo
Rótulo: `Escolha por onde começar`

| Empresa | Descrição | Botão |
|---|---|---|
| Vendas & Soluções | Intermediação de ingredientes alimentícios, commodities e laticínios para indústrias de alimentos e agro. | Conhecer Vendas & Soluções → |
| Tecnologia & Soluções | Portfólio de automações e estudos em Python, SQL e Claude: o que foi construído e o que foi aprendido. | Ver Tecnologia & Soluções → |

## Rodapé (todas as páginas)
```
Geral: contato@b2b-company.com
Vendas & Soluções: vendas@b2b-company.com
Tecnologia & Soluções: tecnologia@b2b-company.com
GitHub: github.com/pauloferreirajr-arch
```
Linha final:
```
© B2B Company · b2b-company.com
B2B Vendas & Soluções · B2B Tecnologia & Soluções
Fotos: Jason W Lacey, Cultureel Gelderland, Tirza van Dijk e Derrick Coetzee, via Wikimedia Commons (CC0).
```

## Limpeza no site
- Remover a página **Members** de template, com o widget de perfil. Páginas e menu → Members → apagar.
- Logo sobreposta ao título em Vendas e Tecnologia: selecionar a logo extra e apagar.
