import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";

const CHAVE_USUARIO = "auraviva-usuario";
const CHAVE_FUNCIONARIO = "auraviva-funcionario";
const CHAVE_SESSAO = "auraviva-sessao";
const CHAVE_CLIENTES = "auraviva-clientes";

const LogIn = () => {
  const navigate = useNavigate();
  const [modoCadastro, setModoCadastro] = useState(false);
  const [tipoAcesso, setTipoAcesso] = useState("cliente");
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
    const chaveConta = tipoAcesso === "funcionario" ? CHAVE_FUNCIONARIO : CHAVE_USUARIO;

    if (modoCadastro) {
      if (dados.senha !== dados.confirmarSenha) {
        setMensagem("As senhas não coincidem.");
        return;
      }

      const usuario = {
        nome: dados.nome.trim(),
        email,
        senha: dados.senha,
        tipoPerfil: tipoAcesso,
        cadastroEm: new Date().toISOString(),
        statusConta: "ativa",
      };
      const usuarioSalvo = JSON.parse(localStorage.getItem(chaveConta) || "null");

      if (usuarioSalvo?.email === email) {
        setMensagem("Este e-mail já está cadastrado.");
        return;
      }

      localStorage.setItem(chaveConta, JSON.stringify(usuario));
      if (tipoAcesso === "cliente") {
        const clientes = JSON.parse(localStorage.getItem(CHAVE_CLIENTES) || "[]");
        localStorage.setItem(CHAVE_CLIENTES, JSON.stringify([
          ...clientes.filter((cliente) => cliente.email !== email),
          usuario,
        ]));
      }
      setMensagem(`Cadastro de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"} realizado! Agora você já pode entrar.`);
      setDados({ nome: "", email, senha: "", confirmarSenha: "" });
      setModoCadastro(false);
      return;
    }

    const usuarioSalvo = JSON.parse(localStorage.getItem(chaveConta) || "null");
    if (usuarioSalvo?.email === email && usuarioSalvo.senha === dados.senha) {
      if (usuarioSalvo.statusConta === "inativa") {
        setMensagem("Esta conta está inativa. Entre em contato com um administrador.");
        return;
      }
      const sessao = { ...usuarioSalvo, tipoPerfil: tipoAcesso, ultimoAcessoEm: new Date().toISOString() };
      localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
      if (tipoAcesso === "cliente") {
        localStorage.setItem(CHAVE_USUARIO, JSON.stringify(sessao));
        const clientes = JSON.parse(localStorage.getItem(CHAVE_CLIENTES) || "[]");
        localStorage.setItem(CHAVE_CLIENTES, JSON.stringify([
          ...clientes.filter((cliente) => cliente.email !== email),
          sessao,
        ]));
        navigate("/auraviva/perfil");
      } else {
        localStorage.setItem(CHAVE_FUNCIONARIO, JSON.stringify(sessao));
        navigate("/auraviva/perfil-usuario");
      }
      return;
    }

    setMensagem("E-mail ou senha inválidos.");
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
          <h1 id="login-titulo">{modoCadastro ? "Crie sua conta" : "Acesse sua conta"}</h1>
          <p>
            {modoCadastro
              ? "Cadastre-se para acompanhar seus pedidos e encontrar novas sementes."
              : "Entre para continuar sua jornada de cultivo."}
          </p>
        </div>

        <form className={styles.formulario} onSubmit={enviarFormulario}>
          <div className={styles.accessTypes} role="group" aria-label="Tipo de acesso">
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
          </div>
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
            {modoCadastro ? `Criar conta de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"}` : "Entrar"}
          </button>
        </form>

        {mensagem && <p className={styles.mensagem} role="status">{mensagem}</p>}

        <p className={styles.switchText}>
          {modoCadastro ? "Já possui uma conta?" : `Ainda não possui uma conta de ${tipoAcesso === "funcionario" ? "funcionário" : "cliente"}?`}{" "}
          <button type="button" className={styles.switchButton} onClick={alternarModo}>
            {modoCadastro ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default LogIn;
