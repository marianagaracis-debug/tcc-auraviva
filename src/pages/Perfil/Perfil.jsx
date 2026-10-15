import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import { artigos, criarSlugArtigo } from "../Blog/artigos";
import AcompanhamentoPedidos from "./AcompanhamentoPedidos";
import styles from "./Perfil.module.css";

const CHAVE_USUARIO = "auraviva-usuario";
const CHAVE_FOTO = "auraviva-foto-perfil";
const CHAVE_WISHLIST = "auraviva-wishlist";
const CHAVE_PEDIDOS = "auraviva-pedidos";
const CHAVE_ENDERECOS = "auraviva-enderecos";

const enderecoVazio = {
  pais: "Brasil",
  estado: "",
  municipio: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  cep: "",
  referencia: "",
};

const obterChaveFeedbackBlog = () => {
  const usuarioSalvo = lerLocalStorage(CHAVE_USUARIO, {});
  const identificador = (usuarioSalvo.email || usuarioSalvo.nome || "visitante").trim().toLowerCase();
  return `auraviva-blog-feedback-${identificador || "visitante"}`;
};

const obterAutorAtual = () => {
  const usuarioSalvo = lerLocalStorage(CHAVE_USUARIO, {});
  const nome = (usuarioSalvo.nome || "Você").trim();
  return nome || "Você";
};

const secoes = [
  { id: "perfil", nome: "Meu perfil", icone: "person" },
  { id: "pedidos", nome: "Meus pedidos", icone: "inventory_2" },
  { id: "enderecos", nome: "Meus endereços", icone: "location_on" },
  { id: "carteira", nome: "Minha carteira", icone: "account_balance_wallet" },
  { id: "comentarios", nome: "Comentários no blog", icone: "chat_bubble" },
  { id: "curtidas", nome: "Curtidas no blog", icone: "favorite" },
  { id: "desejos", nome: "Minha lista de desejos", icone: "bookmark" },
  { id: "conta", nome: "Minha conta", icone: "manage_accounts" },
  { id: "notificacoes", nome: "Notificações", icone: "notifications" },
  { id: "configuracoes", nome: "Configurações", icone: "settings" },
];

const estadosVazios = {
  pedidos: {
    icone: "inventory_2",
    titulo: "Seus pedidos aparecerão aqui",
    descricao: "Quando você fizer uma compra, poderá acompanhar o andamento por esta página.",
    acao: "Explorar produtos",
  },
  enderecos: {
    icone: "location_on",
    titulo: "Nenhum endereço cadastrado",
    descricao: "Seus endereços de entrega ficarão organizados aqui para facilitar suas próximas compras.",
  },
  carteira: {
    icone: "account_balance_wallet",
    titulo: "Sua carteira está vazia",
    descricao: "Créditos e formas de pagamento salvos serão exibidos aqui quando esse recurso estiver disponível.",
  },
  comentarios: {
    icone: "chat_bubble",
    titulo: "Você ainda não comentou no blog",
    descricao: "Seus comentários nas publicações da Auraviva aparecerão aqui.",
    acao: "Visitar o blog",
    destino: "/auraviva/blog",
  },
  curtidas: {
    icone: "favorite",
    titulo: "Nenhuma curtida por enquanto",
    descricao: "As publicações do blog que você curtir ficarão reunidas nesta área.",
    acao: "Visitar o blog",
    destino: "/auraviva/blog",
  },
  desejos: {
    icone: "bookmark",
    titulo: "Sua lista de desejos está vazia",
    descricao: "Salve produtos para encontrá-los facilmente quando quiser voltar a eles.",
    acao: "Encontrar sementes",
    destino: "/auraviva/produtos",
  },
};

const lerLocalStorage = (chave, valorPadrao) => {
  try {
    const valorSalvo = localStorage.getItem(chave);
    return valorSalvo ? JSON.parse(valorSalvo) : valorPadrao;
  } catch {
    return valorPadrao;
  }
};

const obterComentariosDoBlog = () => {
  const feedback = lerLocalStorage(obterChaveFeedbackBlog(), {});
  const autorAtual = obterAutorAtual();

  return Object.entries(feedback).flatMap(([slug, valor]) => {
    const titulo = artigos.find((artigo) => criarSlugArtigo(artigo.titulo) === slug)?.titulo || slug;

    return (valor?.comments ?? [])
      .filter((comentario) => {
        const autor = comentario?.autor;
        return !autor || autor === autorAtual || autor === "Você";
      })
      .map((comentario) => ({
        ...comentario,
        slug,
        titulo,
      }));
  });
};

const obterCurtidasDoBlog = () => {
  const feedback = lerLocalStorage(obterChaveFeedbackBlog(), {});

  return Object.entries(feedback)
    .filter(([, valor]) => valor?.liked)
    .map(([slug, valor]) => ({
      slug,
      titulo: artigos.find((artigo) => criarSlugArtigo(artigo.titulo) === slug)?.titulo || slug,
      likes: valor?.likes ?? 0,
      data: valor?.curtidoEm || "Hoje",
    }));
};

const Perfil = () => {
  const usuarioSalvo = lerLocalStorage(CHAVE_USUARIO, {});
  const [usuario, setUsuario] = useState({
    nome: usuarioSalvo.nome || "Visitante",
    email: usuarioSalvo.email || "",
  });
  const [formulario, setFormulario] = useState({
    nome: usuarioSalvo.nome || "",
    email: usuarioSalvo.email || "",
  });
  const [foto, setFoto] = useState(() => localStorage.getItem(CHAVE_FOTO) || "");
  const [searchParams] = useSearchParams();
  const [secaoAtiva, setSecaoAtiva] = useState(() => searchParams.get("secao") || "perfil");
  const [mensagem, setMensagem] = useState("");
  const [listaDeDesejos, setListaDeDesejos] = useState(() => lerLocalStorage(CHAVE_WISHLIST, []));
  const pedidos = lerLocalStorage(CHAVE_PEDIDOS, []);
  const [enderecos, setEnderecos] = useState(() => {
    const salvos = lerLocalStorage(CHAVE_ENDERECOS, []);
    return Array.isArray(salvos) ? salvos : [];
  });
  const [novoEndereco, setNovoEndereco] = useState({ ...enderecoVazio });
  const [preferencias, setPreferencias] = useState(() => lerLocalStorage("auraviva-notificacoes", {
    pedidos: true,
    novidades: false,
  }));

  const iniciais = usuario.nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase() || "A";
  const secao = secoes.find((item) => item.id === secaoAtiva);

  const atualizarFormulario = (event) => {
    const { name, value } = event.target;
    setFormulario((atual) => ({ ...atual, [name]: value }));
  };

  const atualizarEndereco = (event) => {
    const { name, value } = event.target;
    setNovoEndereco((atual) => ({ ...atual, [name]: value }));
  };

  const salvarEndereco = (event) => {
    event.preventDefault();
    const endereco = {
      ...novoEndereco,
      id: `${Date.now()}`,
    };
    const enderecosAtualizados = [...enderecos, endereco];

    try {
      localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(enderecosAtualizados));
      setEnderecos(enderecosAtualizados);
      setNovoEndereco({ ...enderecoVazio });
      setMensagem("Endereço adicionado com sucesso.");
    } catch {
      setMensagem("Não foi possível salvar o endereço neste navegador.");
    }
  };

  const removerEndereco = (id) => {
    const enderecosAtualizados = enderecos.filter((endereco) => endereco.id !== id);

    try {
      localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(enderecosAtualizados));
      setEnderecos(enderecosAtualizados);
      setMensagem("Endereço removido.");
    } catch {
      setMensagem("Não foi possível remover o endereço neste navegador.");
    }
  };

  const salvarPerfil = (event) => {
    event.preventDefault();
    const nome = formulario.nome.trim();
    const email = formulario.email.trim().toLowerCase();
    const usuarioCompleto = { ...lerLocalStorage(CHAVE_USUARIO, {}), nome, email };

    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuarioCompleto));
    setUsuario({ nome, email });
    setMensagem("Seus dados foram atualizados.");
  };

  const carregarFoto = (event) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      setMensagem("Escolha um arquivo de imagem.");
      return;
    }

    if (arquivo.size > 8 * 1024 * 1024) {
      setMensagem("A imagem deve ter no máximo 8 MB.");
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onload = () => {
        const tamanho = 320;
        const escala = Math.min(1, tamanho / Math.max(imagem.width, imagem.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(imagem.width * escala);
        canvas.height = Math.round(imagem.height * escala);
        canvas.getContext("2d").drawImage(imagem, 0, 0, canvas.width, canvas.height);
        const fotoOtimizada = canvas.toDataURL("image/jpeg", 0.82);

        try {
          localStorage.setItem(CHAVE_FOTO, fotoOtimizada);
          setFoto(fotoOtimizada);
          setMensagem("Sua foto de perfil foi atualizada.");
        } catch {
          setMensagem("Não foi possível salvar essa imagem. Tente escolher uma foto menor.");
        }
      };
      imagem.onerror = () => setMensagem("Não foi possível abrir essa imagem.");
      imagem.src = leitor.result;
    };
    leitor.onerror = () => setMensagem("Não foi possível carregar essa imagem.");
    leitor.readAsDataURL(arquivo);
    event.target.value = "";
  };

  const atualizarPreferencia = (event) => {
    const { name, checked } = event.target;
    const novasPreferencias = { ...preferencias, [name]: checked };
    setPreferencias(novasPreferencias);
    localStorage.setItem("auraviva-notificacoes", JSON.stringify(novasPreferencias));
  };

  const removerDaListaDeDesejos = (id) => {
    const listaAtualizada = listaDeDesejos.filter((produto) => produto.id !== id);
    setListaDeDesejos(listaAtualizada);
    localStorage.setItem(CHAVE_WISHLIST, JSON.stringify(listaAtualizada));
  };

  const renderizarConteudo = () => {
    const comentariosBlog = obterComentariosDoBlog();
    const curtidasBlog = obterCurtidasDoBlog();

    if (secaoAtiva === "perfil") {
      return (
        <form className={styles.profileForm} onSubmit={salvarPerfil}>
          <div className={styles.formHeading}>
            <h3>Dados pessoais</h3>
            <p>Atualize as informações associadas à sua conta.</p>
          </div>
          <div className={styles.formGrid}>
            <label>
              Nome
              <input name="nome" value={formulario.nome} onChange={atualizarFormulario} placeholder="Seu nome" required />
            </label>
            <label>
              E-mail
              <input name="email" type="email" value={formulario.email} onChange={atualizarFormulario} placeholder="voce@email.com" required />
            </label>
          </div>
          <button type="submit" className={styles.primaryButton}>Salvar alterações</button>
        </form>
      );
    }

    if (secaoAtiva === "enderecos") {
      return (
        <div className={styles.addresses}>
          <form className={styles.addressForm} onSubmit={salvarEndereco}>
            <div className={styles.formHeading}>
              <h3>Adicionar endereço</h3>
              <p>Informe os dados completos para facilitar suas próximas entregas.</p>
            </div>
            <div className={styles.formGrid}>
              <label>
                País
                <input name="pais" value={novoEndereco.pais} onChange={atualizarEndereco} autoComplete="country-name" required />
              </label>
              <label>
                Estado / UF
                <input name="estado" value={novoEndereco.estado} onChange={atualizarEndereco} autoComplete="address-level1" required />
              </label>
              <label>
                Município
                <input name="municipio" value={novoEndereco.municipio} onChange={atualizarEndereco} required />
              </label>
              <label>
                Cidade
                <input name="cidade" value={novoEndereco.cidade} onChange={atualizarEndereco} autoComplete="address-level2" required />
              </label>
              <label>
                Bairro
                <input name="bairro" value={novoEndereco.bairro} onChange={atualizarEndereco} required />
              </label>
              <label>
                Rua / Avenida
                <input name="logradouro" value={novoEndereco.logradouro} onChange={atualizarEndereco} autoComplete="street-address" required />
              </label>
              <label>
                Número
                <input name="numero" value={novoEndereco.numero} onChange={atualizarEndereco} required />
              </label>
              <label>
                Complemento
                <input name="complemento" value={novoEndereco.complemento} onChange={atualizarEndereco} />
              </label>
              <label>
                CEP / Código postal
                <input name="cep" value={novoEndereco.cep} onChange={atualizarEndereco} autoComplete="postal-code" required />
              </label>
              <label>
                Ponto de referência
                <input name="referencia" value={novoEndereco.referencia} onChange={atualizarEndereco} />
              </label>
            </div>
            <button type="submit" className={styles.primaryButton}>Adicionar endereço</button>
          </form>

          {enderecos.length > 0 && (
            <div className={styles.savedAddresses}>
              <h3>Endereços cadastrados</h3>
              {enderecos.map((endereco, indice) => (
                <article className={styles.addressCard} key={endereco.id}>
                  <div className={styles.addressCardHeader}>
                    <h4>Endereço {indice + 1}</h4>
                    <button type="button" className={styles.secondaryButton} onClick={() => removerEndereco(endereco.id)}>
                      Remover
                    </button>
                  </div>
                  <p>{endereco.logradouro}, {endereco.numero}{endereco.complemento && ` - ${endereco.complemento}`}</p>
                  <p>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                  <p>{endereco.municipio} · {endereco.cep}</p>
                  <p>{endereco.pais}{endereco.referencia && ` · Referência: ${endereco.referencia}`}</p>
                </article>
              ))}
            </div>
          )}
          <p className={styles.localDataNote}>Seus endereços ficam salvos apenas neste navegador.</p>
        </div>
      );
    }

    if (secaoAtiva === "conta") {
      return (
        <div className={styles.accountDetails}>
          <div className={styles.formHeading}>
            <h3>Informações da conta</h3>
            <p>Dados básicos usados para identificar sua conta Auraviva.</p>
          </div>
          <dl>
            <div><dt>Nome</dt><dd>{usuario.nome}</dd></div>
            <div><dt>E-mail</dt><dd>{usuario.email || "Não informado"}</dd></div>
            <div><dt>Conta</dt><dd>{usuario.email ? "Cadastrada" : "Ainda sem cadastro"}</dd></div>
          </dl>
          <button type="button" className={styles.secondaryButton} onClick={() => setSecaoAtiva("perfil")}>
            Editar dados pessoais
          </button>
        </div>
      );
    }

    if (secaoAtiva === "notificacoes") {
      return (
        <div className={styles.preferences}>
          <div className={styles.formHeading}>
            <h3>Preferências de notificações</h3>
            <p>Escolha quais atualizações gostaria de receber.</p>
          </div>
          <label className={styles.preferenceRow}>
            <span><strong>Atualizações de pedidos</strong><small>Avisos sobre o andamento das suas compras.</small></span>
            <input type="checkbox" name="pedidos" checked={preferencias.pedidos} onChange={atualizarPreferencia} />
          </label>
          <label className={styles.preferenceRow}>
            <span><strong>Novidades da Auraviva</strong><small>Conteúdos, sementes e novidades da loja.</small></span>
            <input type="checkbox" name="novidades" checked={preferencias.novidades} onChange={atualizarPreferencia} />
          </label>
        </div>
      );
    }

    if (secaoAtiva === "configuracoes") {
      return (
        <div className={styles.accountDetails}>
          <div className={styles.formHeading}>
            <h3>Configurações da conta</h3>
            <p>Gerencie suas preferências pessoais.</p>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={() => setSecaoAtiva("notificacoes")}>
            Ajustar notificações
          </button>
          <p className={styles.localDataNote}>Seus dados de perfil ficam salvos neste navegador.</p>
        </div>
      );
    }

    if (secaoAtiva === "pedidos" && pedidos.length > 0) {
      return <AcompanhamentoPedidos pedidos={pedidos} />;
    }

    if (secaoAtiva === "comentarios" && comentariosBlog.length > 0) {
      return (
        <div className={styles.activityList}>
          {comentariosBlog.map((comentario) => (
            <article className={styles.activityCard} key={`${comentario.slug}-${comentario.id}`}>
              <span className={styles.activityTag}>Comentário</span>
              <h3>{comentario.titulo}</h3>
              <p>{comentario.texto}</p>
              <small>{comentario.data}</small>
            </article>
          ))}
        </div>
      );
    }

    if (secaoAtiva === "curtidas" && curtidasBlog.length > 0) {
      return (
        <div className={styles.activityList}>
          {curtidasBlog.map((artigo) => (
            <article className={styles.activityCard} key={`${artigo.slug}-curtida`}>
              <span className={styles.activityTag}>Curtida</span>
              <h3>{artigo.titulo}</h3>
              <p>Você curtiu este artigo no blog.</p>
              <small>{artigo.data}</small>
            </article>
          ))}
        </div>
      );
    }

    if (secaoAtiva === "desejos" && listaDeDesejos.length > 0) {
      return (
        <div className={styles.wishlistGrid}>
          {listaDeDesejos.map((produto) => (
            <article className={styles.wishlistItem} key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />
              <div>
                <span>{produto.categoria}</span>
                <h3>{produto.nome}</h3>
                <p>{produto.preco}</p>
                <button type="button" className={styles.secondaryButton} onClick={() => removerDaListaDeDesejos(produto.id)}>
                  Remover da lista
                </button>
              </div>
            </article>
          ))}
        </div>
      );
    }

    const estado = estadosVazios[secaoAtiva];
    return (
      <div className={styles.emptyState}>
        <span className={`material-symbols-outlined ${styles.emptyIcon}`} aria-hidden="true">{estado.icone}</span>
        <h3>{estado.titulo}</h3>
        <p>{estado.descricao}</p>
        {estado.acao && (
          <Link className={styles.secondaryButton} to={estado.destino || "/auraviva/produtos"}>
            {estado.acao}
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <MenuAuraviva />
      <main className={styles.page}>
        <div className={styles.pageInner}>
          <header className={styles.accountHeader}>
            <div>
              <span className={styles.eyebrow}>Área do cliente</span>
              <h1>Minha conta</h1>
            </div>
            <div className={styles.identity}>
              <div className={styles.avatar} aria-label={`Foto de ${usuario.nome}`}>
                {foto ? <img src={foto} alt="" /> : <span>{iniciais}</span>}
              </div>
              <div className={styles.identityText}>
                <span>Sua conta Auraviva</span>
                <strong>{usuario.nome}</strong>
              </div>
              <label className={styles.photoButton} title="Alterar foto de perfil">
                <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
                <span className={styles.visuallyHidden}>Alterar foto de perfil</span>
                <input type="file" accept="image/*" onChange={carregarFoto} />
              </label>
            </div>
          </header>

          <div className={styles.accountLayout}>
            <nav className={styles.sidebar} aria-label="Seções da conta">
              {secoes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.navItem} ${secaoAtiva === item.id ? styles.navItemActive : ""}`}
                  aria-current={secaoAtiva === item.id ? "page" : undefined}
                  onClick={() => {
                    setSecaoAtiva(item.id);
                    setMensagem("");
                  }}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">{item.icone}</span>
                  {item.nome}
                </button>
              ))}
            </nav>

            <section className={styles.content} aria-labelledby="secao-titulo">
              <div className={styles.contentHeader}>
                <span className={styles.sectionKicker}>Sua Auraviva</span>
                <h2 id="secao-titulo">{secao.nome}</h2>
              </div>
              {mensagem && <p className={styles.statusMessage} role="status">{mensagem}</p>}
              {renderizarConteudo()}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Perfil;