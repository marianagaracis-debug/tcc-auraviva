import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LogIn.module.css";

const LogIn = () => {
  const [modoCadastro, setModoCadastro] = useState(false);

  const alternarModo = () => setModoCadastro((modoAtual) => !modoAtual);

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

        <form className={styles.formulario} onSubmit={(event) => event.preventDefault()}>
          {modoCadastro && (
            <label>
              Nome completo
              <input type="text" placeholder="Digite seu nome" required />
            </label>
          )}

          <label>
            E-mail
            <input type="email" placeholder="voce@email.com" required />
          </label>

          <label>
            Senha
            <input type="password" placeholder="Digite sua senha" required />
          </label>

          {modoCadastro && (
            <label>
              Confirmar senha
              <input type="password" placeholder="Repita sua senha" required />
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
