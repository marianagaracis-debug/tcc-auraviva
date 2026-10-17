import { useState } from "react"
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"
import { produtos } from "../Produto/Produto"
import { obterProdutosAtivos } from "../../utils/gestaoLoja"
import ProductDetailsModal from "../../components/ProductDetailsModal"
import { adicionarProdutoAoCarrinho } from "../../utils/carrinho"
import styles from "./SementesDeVerao.module.css"

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "flores", label: "Flores" },
  { id: "frutas", label: "Frutas" },
  { id: "graos", label: "Grãos" },
  { id: "leguminosas", label: "Leguminosas" },
  { id: "vegetais", label: "Vegetais" },
  { id: "outros", label: "Outros cultivos" },
]

const SementesDeVerao = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos")
  const [termoBusca, setTermoBusca] = useState("")
  const [quantidades, setQuantidades] = useState({})
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [mensagemCarrinho, setMensagemCarrinho] = useState("")

  const produtosDeVerao = obterProdutosAtivos(produtos).filter((produto) => produto.estacaoId === "verao")
  const normalizar = (texto) => texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")

  const produtosDaCategoria = categoriaSelecionada === "todos"
    ? produtosDeVerao
    : produtosDeVerao.filter((produto) => produto.categoriaId === categoriaSelecionada)
  const produtosFiltrados = produtosDaCategoria.filter((produto) =>
    normalizar(produto.nome).includes(normalizar(termoBusca.trim()))
  )

  const alterarQuantidade = (nome, variacao) => {
    setQuantidades((atuais) => ({
      ...atuais,
      [nome]: Math.max(1, (atuais[nome] || 1) + variacao),
    }))
  }

  const comprarProduto = (produto) => {
    adicionarProdutoAoCarrinho(produto, quantidades[produto.nome] || 1)
    setMensagemCarrinho(`${produto.nome} adicionado ao carrinho.`)
  }

  return (
    <div className="container">
      <MenuAuraviva />

      <section className={styles["hero-video"]}>
        <video autoPlay muted loop className={styles["video-bg"]}>
          <source src="https://www.pexels.com/pt-br/download/video/5487208/" type="video/mp4" />
        </video>

        <h1>
          Explore a coleção <span>vibrante</span> de plantas que florescem sob o sol.
          Perfeitas para quem ama energia, cor e vitalidade no ambiente.
        </h1>
      </section>

      <section className={styles.sowingInfo} aria-label="Informações de semeadura para o verão">
        <table className={styles.sowingTable}>
          <thead>
            <tr>
              <th scope="col">Temperatura de semeadura</th>
              <th scope="col">Meses de semeadura</th>
              <th scope="col">Temperatura na sua região?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25–30 °C</td>
              <td>Fev | Mar | Abr | Mai</td>
              <td>A época de semeadura pode variar conforme o local.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <br/>

      <div className={styles.catalogLayout}>
        <aside className={styles.catalogSidebar}>
          <h2 className={styles.catalogTitle}>Categorias</h2>

          <div className={styles.filterSection}>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                className={`${styles.filterOption} ${categoriaSelecionada === categoria.id ? styles.filterOptionActive : ""}`}
                onClick={() => setCategoriaSelecionada(categoria.id)}
              >
                {categoria.label}
              </button>
            ))}
          </div>
        </aside>

        <main className={styles.catalogResults}>
          <div className={styles.searchGroup}>
            <label className={styles.searchLabel} htmlFor="busca-produto-verao">
              Encontre sua semente
            </label>
            <div className={styles.searchBox}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`} aria-hidden="true">
                search
              </span>
              <input
                id="busca-produto-verao"
                className={styles.searchInput}
                type="search"
                placeholder="Buscar pelo nome do produto..."
                value={termoBusca}
                onChange={(event) => setTermoBusca(event.target.value)}
              />
            </div>
          </div>
          {produtosFiltrados.length === 0 && (
            <p className={styles.emptyResults} role="status">
              Nenhum produto encontrado{termoBusca.trim() ? ` para "${termoBusca.trim()}"` : ""}.
            </p>
          )}
          {mensagemCarrinho && <p role="status">{mensagemCarrinho}</p>}
          <div className="cards">
            {produtosFiltrados.map((produto) => (
              <div
                className="card"
                key={produto.nome}
                onClick={(event) => {
                  if (event.target.closest("button")) return
                  setProdutoSelecionado(produto)
                }}
              >
                <img src={produto.imagem} alt={produto.alt} />
                <div className="info">
                  <div className={styles.productBadges}>
                    <span className="categoria-badge" data-categoria={produto.categoriaId}>{produto.categoria}</span>
                    <span className={styles.seasonBadge}>{produto.estacao}</span>
                  </div>
                  <h3>{produto.nome}</h3>
                  <p className="preco">{produto.preco}</p>
                  <div className={styles.quantityControl} aria-label={`Quantidade de ${produto.nome}`}>
                    <button
                      type="button"
                      onClick={() => alterarQuantidade(produto.nome, -1)}
                      aria-label={`Diminuir quantidade de ${produto.nome}`}
                    >
                      −
                    </button>
                    <span>{quantidades[produto.nome] || 1}</span>
                    <button
                      type="button"
                      onClick={() => alterarQuantidade(produto.nome, 1)}
                      aria-label={`Aumentar quantidade de ${produto.nome}`}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => comprarProduto(produto)}>Comprar</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {produtoSelecionado && (
        <ProductDetailsModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          onAdded={() => {
            setMensagemCarrinho(`${produtoSelecionado.nome} adicionado ao carrinho.`)
            setProdutoSelecionado(null)
          }}
        />
      )}

      <footer>© 2025 Auraviva | Cresça com propósito 🌿</footer>
    </div>
  )
}

export default SementesDeVerao