import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import styles from "./Carrinho.module.css";

const CHAVE_CARRINHO = "auraviva-carrinho";

const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Carrinho = () => {
  const [itens, setItens] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  }, [itens]);

  const atualizarQuantidade = (id, variacao) => {
    setItens((atuais) => atuais
      .map((item) => item.id === id
        ? { ...item, quantidade: Math.max(1, item.quantidade + variacao) }
        : item)
    );
  };

  const removerItem = (id) => {
    setItens((atuais) => atuais.filter((item) => item.id !== id));
  };

  const subtotal = itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className={styles.page}>
      <MenuAuraviva />
      <main className={styles.content}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Sua seleção</p>
            <h1>Carrinho de compras</h1>
            <p className={styles.description}>Revise suas sementes antes de finalizar o pedido.</p>
          </div>
          <span className={styles.itemCount}>{totalItens} {totalItens === 1 ? "item" : "itens"}</span>
        </div>

        {itens.length === 0 ? (
          <section className={styles.emptyState}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <h2>Seu carrinho está vazio</h2>
            <p>Escolha suas sementes favoritas e elas aparecerão aqui.</p>
            <Link to="/auraviva/funcionario/produtos" className={styles.primaryButton}>Explorar produtos</Link>
          </section>
        ) : (
          <div className={styles.layout}>
            <section className={styles.items} aria-label="Itens do carrinho">
              {itens.map((item) => (
                <article className={styles.item} key={item.id}>
                  <img src={item.imagem} alt={item.nome} />
                  <div className={styles.itemInfo}>
                    <span>{item.categoria}</span>
                    <h2>{item.nome}</h2>
                    <strong>{formatarPreco(item.preco)}</strong>
                  </div>
                  <div className={styles.controls}>
                    <div className={styles.quantity}>
                      <button type="button" onClick={() => atualizarQuantidade(item.id, -1)} aria-label={`Diminuir quantidade de ${item.nome}`}>−</button>
                      <b>{item.quantidade}</b>
                      <button type="button" onClick={() => atualizarQuantidade(item.id, 1)} aria-label={`Aumentar quantidade de ${item.nome}`}>+</button>
                    </div>
                    <button type="button" className={styles.remove} onClick={() => removerItem(item.id)}>Remover</button>
                  </div>
                  <strong className={styles.itemTotal}>{formatarPreco(item.preco * item.quantidade)}</strong>
                </article>
              ))}
            </section>

            <aside className={styles.summary}>
              <h2>Resumo do pedido</h2>
              <div><span>Subtotal</span><strong>{formatarPreco(subtotal)}</strong></div>
              <div><span>Entrega</span><strong className={styles.free}>Grátis</strong></div>
              <div className={styles.total}><span>Total</span><strong>{formatarPreco(subtotal)}</strong></div>
              <button type="button" className={styles.primaryButton} onClick={() => window.alert("Pedido pronto para finalização!")}>Finalizar pedido</button>
              <Link to="/auraviva/funcionario/produtos" className={styles.continue}>Continuar comprando</Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Carrinho;
