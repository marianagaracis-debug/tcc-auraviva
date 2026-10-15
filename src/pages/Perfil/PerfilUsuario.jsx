import { useState } from "react";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import AcompanhamentoPedidos from "./AcompanhamentoPedidos";
import styles from "./Perfil.module.css";

const lerLocalStorage = (chave, valorPadrao) => {
  try {
    const valorSalvo = localStorage.getItem(chave);
    return valorSalvo ? JSON.parse(valorSalvo) : valorPadrao;
  } catch {
    return valorPadrao;
  }
};

const PerfilUsuario = () => {
  const funcionario = lerLocalStorage("auraviva-sessao", {});
  const [pedidos, setPedidos] = useState(() => {
    const salvos = lerLocalStorage("auraviva-pedidos", []);
    return Array.isArray(salvos) ? salvos : [];
  });
  const iniciais = (funcionario.nome || "Funcionário")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  const atualizarPedido = (id, alteracoes, registrarEtapa = false) => {
    setPedidos((atuais) => {
      const atualizados = atuais.map((pedido) => {
        if (pedido.id !== id) return pedido;

        const historicoAtual = Array.isArray(pedido.historico) ? pedido.historico : [];
        const historico = registrarEtapa
          ? [...historicoAtual, { status: alteracoes.status, data: new Date().toISOString() }]
          : historicoAtual;
        return { ...pedido, ...alteracoes, historico };
      });
      localStorage.setItem("auraviva-pedidos", JSON.stringify(atualizados));
      return atualizados;
    });
  };

  return (
    <>
      <MenuAuraviva />
      <main className={styles.page}>
        <div className={styles.pageInner}>
          <header className={styles.accountHeader}>
            <div>
              <span className={styles.eyebrow}>Área interna</span>
              <h1>Painel do funcionário</h1>
            </div>
            <div className={styles.identity}>
              <div className={styles.avatar} aria-hidden="true">{iniciais}</div>
              <div className={styles.identityText}>
                <span>Funcionário</span>
                <strong>{funcionario.nome || "Conta Auraviva"}</strong>
              </div>
            </div>
          </header>

          <section className={styles.content} aria-labelledby="pedidos-funcionario">
            <div className={styles.contentHeader}>
              <span className={styles.sectionKicker}>Operação da loja</span>
              <h2 id="pedidos-funcionario">Gerenciar pedidos e entregas</h2>
            </div>
            {pedidos.length > 0 ? (
              <AcompanhamentoPedidos pedidos={pedidos} modoGestao atualizarPedido={atualizarPedido} />
            ) : (
              <div className={styles.emptyState}>
                <span className={`material-symbols-outlined ${styles.emptyIcon}`} aria-hidden="true">inventory_2</span>
                <h3>Nenhum pedido para gerenciar</h3>
                <p>Os novos pedidos aparecerão aqui para atualização de status e entrega.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default PerfilUsuario;