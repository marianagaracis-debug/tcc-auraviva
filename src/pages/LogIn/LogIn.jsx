import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

const CHAVE_USUARIO = "auraviva-usuario";

const LogIn = () => {
  const navigate = useNavigate();
  const [modoCadastro, setModoCadastro] = useState(false);
  const [dados, setDados] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });
  const [mensagem, setMensagem] = useState("");

  const alternarModo = () => {
    setModoCadastro((modoAtual) => !modoAtual);
    setMensagem("");
  };

  const atualizarCampo = (event) => {
    const { name, value } = event.target;
    setDados((dadosAtuais) => ({ ...dadosAtuais, [name]: value }));
  };

  const enviarFormulario = (event) => {
    event.preventDefault();
    const email = dados.email.trim().toLowerCase();

    if (modoCadastro) {
      if (dados.senha !== dados.confirmarSenha) {
        setMensagem("As senhas não coincidem.");
        return;
      }

      const usuario = { nome: dados.nome.trim(), email, senha: dados.senha };
      const usuarioSalvo = JSON.parse(localStorage.getItem(CHAVE_USUARIO) || "null");

      if (usuarioSalvo?.email === email) {
        setMensagem("Este e-mail já está cadastrado.");
        return;
      }

      localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
      setMensagem("Cadastro realizado! Agora você já pode entrar.");
      setDados({ nome: "", email, senha: "", confirmarSenha: "" });
      setModoCadastro(false);
      return;
    }

    const usuarioSalvo = JSON.parse(localStorage.getItem(CHAVE_USUARIO) || "null");
    if (usuarioSalvo?.email === email && usuarioSalvo.senha === dados.senha) {
      navigate("/auraviva/funcionario/home");
      return;
    }

    setMensagem("E-mail ou senha inválidos.");
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundShape} aria-hidden="true" />

      <section className={styles.panel} aria-labelledby="login-titulo">
        <Link to="/auraviva/funcionario/home" className={styles.logo}>
          Auraviva
        </Link>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>Bem-vindo à Auraviva</span>
          <h1 id="login-titulo">{modoCadastro ? "Crie sua conta" : "Acesse sua conta"}</h1>
          <p>
            {modoCadastro
              ? "Cadastre-se para acompanhar seus pedidos e encontrar novas sementes."
              : "Entre para continuar sua jornada de cultivo."}
          </p>
        </div>

        <form className={styles.formulario} onSubmit={enviarFormulario}>
          {modoCadastro && (
            <label>
              Nome completo
              <input name="nome" type="text" placeholder="Digite seu nome" value={dados.nome} onChange={atualizarCampo} required />
            </label>
          )}

          <label>
            E-mail
            <input name="email" type="email" placeholder="voce@email.com" value={dados.email} onChange={atualizarCampo} required />
          </label>

          <label>
            Senha
            <input name="senha" type="password" placeholder="Digite sua senha" value={dados.senha} onChange={atualizarCampo} required />
          </label>

          {modoCadastro && (
            <label>
              Confirmar senha
              <input name="confirmarSenha" type="password" placeholder="Repita sua senha" value={dados.confirmarSenha} onChange={atualizarCampo} required />
            </label>
          )}

          {!modoCadastro && (
            <button type="button" className={styles.linkButton}>
              Esqueci minha senha
            </button>
          )}

          <button type="submit" className={styles.submitButton}>
            {modoCadastro ? "Criar conta" : "Entrar"}
          </button>
        </form>

        {mensagem && <p className={styles.mensagem} role="status">{mensagem}</p>}

        <p className={styles.switchText}>
          {modoCadastro ? "Já possui uma conta?" : "Ainda não possui uma conta?"}{" "}
          <button type="button" className={styles.switchButton} onClick={alternarModo}>
            {modoCadastro ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default LogIn;
