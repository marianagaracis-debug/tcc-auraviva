import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/gestaoLoja";
import styles from "./LogIn.module.css";

const CHAVE_SESSAO = "auraviva-sessao";

const LogIn = () => {
  const navigate = useNavigate();
  const [modoCadastro, setModoCadastro] = useState(false);
  const [modoRecuperacao, setModoRecuperacao] = useState(false);
  const [tipoAcesso, setTipoAcesso] = useState("cliente");
  const [dados, setDados] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });
  const [codigoFuncionario, setCodigoFuncionario] = useState("");
  const [codigoRecuperacao, setCodigoRecuperacao] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [etapaRecuperacao, setEtapaRecuperacao] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const alternarModo = () => {
    setModoCadastro((modoAtual) => !modoAtual);
    setModoRecuperacao(false);
    setMensagem("");
  };

  const atualizarCampo = (event) => {
    const { name, value } = event.target;
    setDados((dadosAtuais) => ({ ...dadosAtuais, [name]: value }));
  };

  const enviarFormulario = async (event) => {
    event.preventDefault();
    const email = dados.email.trim().toLowerCase();
    setEnviando(true);
    setMensagem("");
    try {
      if (modoRecuperacao) {
        if (etapaRecuperacao === 0) {
          await apiRequest(`/recuperar-senha/solicitar-codigo?email=${encodeURIComponent(email)}`, { method: "POST" });
          setEtapaRecuperacao(1);
          setMensagem("Se a conta existir, o código de recuperação foi enviado ao e-mail.");
        } else {
          await apiRequest("/recuperar-senha/redefinir-senha", {
            method: "POST",
            body: JSON.stringify({ email, codigo: codigoRecuperacao, novaSenha }),
          });
          setModoRecuperacao(false);
          setEtapaRecuperacao(0);
          setMensagem("Senha redefinida. Entre com sua nova senha.");
        }
        return;
      }

      if (modoCadastro) {
        if (dados.senha !== dados.confirmarSenha) {
          setMensagem("As senhas não coincidem.");
          return;
        }
        const cadastro = {
          nome: dados.nome.trim(),
          username: email,
          password: dados.senha,
        };
        if (tipoAcesso === "funcionario") {
          await apiRequest("/usuarios/create-funcionario", {
            method: "POST",
            headers: { "X-Codigo-Funcionario": codigoFuncionario },
            body: JSON.stringify(cadastro),
          });
        } else {
          await apiRequest("/usuarios/create", { method: "POST", body: JSON.stringify(cadastro) });
        }
        setMensagem(`Cadastro de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"} realizado. Agora você já pode entrar.`);
        setDados({ nome: "", email, senha: "", confirmarSenha: "" });
        setModoCadastro(false);
        return;
      }

      await apiRequest("/login", {
        method: "POST",
        body: new URLSearchParams({ username: email, password: dados.senha }),
      });
      const perfil = await apiRequest("/usuarios/me");
      const sessao = {
        ...perfil,
        email: perfil.username,
        tipoPerfil: perfil.nivelAcesso === "USER" ? "cliente" : "funcionario",
      };
      localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
      localStorage.setItem("auraviva-usuario", JSON.stringify(sessao));
      navigate(sessao.tipoPerfil === "cliente" ? "/auraviva/perfil" : "/auraviva/perfil-usuario");
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundShape} aria-hidden="true" />

      <section className={styles.panel} aria-labelledby="login-titulo">
        <Link to="/auraviva/home" className={styles.logo}>
          Auraviva
        </Link>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>Bem-vindo à Auraviva</span>
          <h1 id="login-titulo">{modoRecuperacao ? "Recupere sua senha" : modoCadastro ? "Crie sua conta" : "Acesse sua conta"}</h1>
          <p>
            {modoRecuperacao
              ? "Informe seu e-mail e siga as instruções enviadas para redefinir sua senha."
              : modoCadastro
              ? "Cadastre-se para acompanhar seus pedidos e encontrar novas sementes."
              : "Entre para continuar sua jornada de cultivo."}
          </p>
        </div>

        <form className={styles.formulario} onSubmit={enviarFormulario}>
          {!modoRecuperacao && <div className={styles.accessTypes} role="group" aria-label="Tipo de acesso">
            <button
              type="button"
              className={tipoAcesso === "cliente" ? styles.accessTypeActive : ""}
              aria-pressed={tipoAcesso === "cliente"}
              onClick={() => { setTipoAcesso("cliente"); setMensagem(""); }}
            >
              Cliente
            </button>
            <button
              type="button"
              className={tipoAcesso === "funcionario" ? styles.accessTypeActive : ""}
              aria-pressed={tipoAcesso === "funcionario"}
              onClick={() => { setTipoAcesso("funcionario"); setMensagem(""); }}
            >
              Funcionário
            </button>
          </div>}
          {modoCadastro && !modoRecuperacao && (
            <label>
              Nome completo
              <input name="nome" type="text" placeholder="Digite seu nome" value={dados.nome} onChange={atualizarCampo} required />
            </label>
          )}

          <label>
            E-mail
            <input name="email" type="email" placeholder="voce@email.com" value={dados.email} onChange={atualizarCampo} required />
          </label>

          {modoCadastro && tipoAcesso === "funcionario" && !modoRecuperacao && (
            <label>
              Código de funcionário
              <input value={codigoFuncionario} onChange={(event) => setCodigoFuncionario(event.target.value)} required />
            </label>
          )}

          {!modoRecuperacao && <label>
            Senha
            <input name="senha" type="password" placeholder="Digite sua senha" value={dados.senha} onChange={atualizarCampo} required />
          </label>}

          {modoCadastro && !modoRecuperacao && (
            <label>
              Confirmar senha
              <input name="confirmarSenha" type="password" placeholder="Repita sua senha" value={dados.confirmarSenha} onChange={atualizarCampo} required />
            </label>
          )}

          {modoRecuperacao && etapaRecuperacao > 0 && (
            <>
              <label>Código de recuperação<input value={codigoRecuperacao} onChange={(event) => setCodigoRecuperacao(event.target.value)} required /></label>
              <label>Nova senha<input type="password" value={novaSenha} onChange={(event) => setNovaSenha(event.target.value)} minLength={8} required /></label>
            </>
          )}

          {!modoCadastro && !modoRecuperacao && (
            <button type="button" className={styles.linkButton} onClick={() => { setModoRecuperacao(true); setMensagem(""); }}>
              Esqueci minha senha
            </button>
          )}

          <button type="submit" className={styles.submitButton} disabled={enviando}>
            {enviando ? "Aguarde..." : modoRecuperacao ? (etapaRecuperacao === 0 ? "Enviar código" : "Redefinir senha") : modoCadastro ? `Criar conta de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"}` : "Entrar"}
          </button>
        </form>

        {mensagem && <p className={styles.mensagem} role="status">{mensagem}</p>}

        <p className={styles.switchText}>
          {modoRecuperacao ? "Lembrou sua senha?" : modoCadastro ? "Já possui uma conta?" : `Ainda não possui uma conta de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"}?`}{" "}
          <button type="button" className={styles.switchButton} onClick={() => {
            if (modoRecuperacao) {
              setModoRecuperacao(false);
              setEtapaRecuperacao(0);
              setMensagem("");
            } else alternarModo();
          }}>
            {modoRecuperacao || modoCadastro ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default LogIn;
