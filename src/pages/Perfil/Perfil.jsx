import { useState } from "react";
import { Link } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import styles from "./Perfil.module.css";

const CHAVE_USUARIO = "auraviva-usuario";
const CHAVE_FOTO = "auraviva-foto-perfil";

const secoes = [
  { id: "perfil", nome: "Meu perfil", icone: "person" },
  { id: "pedidos", nome: "Meus pedidos", icone: "inventory_2" },
  { id: "enderecos", nome: "Meus endereços", icone: "location_on" },
  { id: "carteira", nome: "Minha carteira", icone: "account_balance_wallet" },
  { id: "comentarios", nome: "Comentários no blog", icone: "chat_bubble" },
  { id: "curtidas", nome: "Curtidas no blog", icone: "favorite" },
  { id: "desejos", nome: "Minha lista de desejos", icone: "bookmark" },
  { id: "eventos", nome: "Eventos", icone: "event" },
  { id: "assinaturas", nome: "Assinaturas", icone: "autorenew" },
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
    destino: "/auraviva/funcionario/produtos",
  },
  eventos: {
    icone: "event",
    titulo: "Nenhum evento disponível",
    descricao: "Novos encontros e atividades da comunidade aparecerão aqui.",
  },
  assinaturas: {
    icone: "autorenew",
    titulo: "Você não tem assinaturas ativas",
    descricao: "As assinaturas de produtos ou conteúdos ficarão disponíveis aqui quando esse serviço for lançado.",
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
  const [secaoAtiva, setSecaoAtiva] = useState("perfil");
  const [mensagem, setMensagem] = useState("");
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

  const renderizarConteudo = () => {
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

    const estado = estadosVazios[secaoAtiva];
    return (
      <div className={styles.emptyState}>
        <span className={`material-symbols-outlined ${styles.emptyIcon}`} aria-hidden="true">{estado.icone}</span>
        <h3>{estado.titulo}</h3>
        <p>{estado.descricao}</p>
        {estado.acao && (
          <Link className={styles.secondaryButton} to={estado.destino || "/auraviva/funcionario/produtos"}>
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