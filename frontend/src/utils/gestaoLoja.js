export const CHAVE_PRODUTOS = "auraviva-produtos";
export const CHAVE_ATIVIDADES = "auraviva-atividades";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, "");

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  const bodyIsForm = options.body instanceof FormData || options.body instanceof URLSearchParams;
  if (options.body && !bodyIsForm && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch {
    throw new Error(`Não foi possível conectar à API em ${API_URL}. Verifique se o backend está em execução.`);
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const detalhe = typeof data === "string"
      ? data
      : data?.message || data?.erro || data?.error || data?.detail;
    throw new Error(detalhe || `A API respondeu com erro (${response.status}).`);
  }

  return data;
};

const formatarPreco = (preco) =>
  Number(preco || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const converterProdutoApi = (produto) => {
  const categoria = produto.tipoSemente || "Outros cultivos";
  const categorias = {
    flores: ["flor", "girassol"],
    frutas: ["fruta", "melancia", "melão"],
    graos: ["grão", "graos", "cereal"],
    leguminosas: ["leguminosa", "feijão", "soja", "ervilha"],
    vegetais: ["vegetal", "hortaliça", "hortalica"],
  };
  const categoriaNormalizada = categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const categoriaId = Object.entries(categorias).find(([, termos]) =>
    termos.some((termo) => categoriaNormalizada.includes(termo.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))),
  )?.[0] || "outros";

  return {
    ...produto,
    id: produto.id,
    nome: produto.nome,
    imagem: produto.imagemUrl || "",
    alt: produto.nome,
    categoriaId,
    categoria,
    estacaoId: String(produto.estacao || "").toLowerCase(),
    estacao: String(produto.estacao || "").toLowerCase() === "verao" ? "Verão" : "Inverno",
    preco: formatarPreco(produto.preco),
    ativo: produto.statusProduto === "ATIVO",
  };
};

export const obterCatalogoApi = async (estacao) => {
  const path = estacao
    ? `/produtos/estacao/${encodeURIComponent(estacao.toUpperCase())}`
    : "/produtos/all";
  const produtosApi = await apiRequest(path);
  return produtosApi.map(converterProdutoApi);
};

export const lerDadosLocais = (chave, padrao) => {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : padrao;
  } catch {
    return padrao;
  }
};

export const obterProdutosGerenciaveis = (catalogoBase) => {
  const alteracoesSalvas = lerDadosLocais(CHAVE_PRODUTOS, []);
  const alteracoes = Array.isArray(alteracoesSalvas) ? alteracoesSalvas : [];
  const porId = new Map(alteracoes.map((produto) => [produto.id || produto.nome, produto]));
  const idsBase = new Set(catalogoBase.map((produto) => produto.id || produto.nome));
  const catalogoAtualizado = catalogoBase.map((produto) => ({
    ...produto,
    ...(porId.get(produto.id || produto.nome) || {}),
  }));
  const novosProdutos = alteracoes.filter((produto) => !idsBase.has(produto.id || produto.nome));

  return [...catalogoAtualizado, ...novosProdutos];
};

export const obterProdutosAtivos = (catalogoBase) =>
  obterProdutosGerenciaveis(catalogoBase).filter((produto) => produto.ativo !== false);

export const registrarAtividade = (descricao) => {
  const atividadesSalvas = lerDadosLocais(CHAVE_ATIVIDADES, []);
  const atividades = Array.isArray(atividadesSalvas) ? atividadesSalvas : [];
  const sessao = lerDadosLocais("auraviva-sessao", {});
  const atividade = {
    id: `${Date.now()}`,
    descricao,
    autor: sessao.nome || "Funcionário",
    data: new Date().toISOString(),
  };
  localStorage.setItem(CHAVE_ATIVIDADES, JSON.stringify([atividade, ...atividades].slice(0, 50)));
  return atividade;
};
