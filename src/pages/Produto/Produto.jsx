import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"
import styles from "./Produto.module.css";

const Produto = () => {
    const [quantidades, setQuantidades] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
    const [searchParams] = useSearchParams();
    const cardsRef = useRef(null);
    const mensagemBuscaRef = useRef(null);
    const termoBusca = (searchParams.get("q") || "").trim();

    useEffect(() => {
        const normalizar = (texto) => texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        const termo = normalizar(termoBusca);
        const cards = cardsRef.current?.querySelectorAll(".card") || [];
        let encontrados = 0;

        cards.forEach((card) => {
            const nome = card.querySelector("h3")?.textContent || "";
            const badgeCategoria = card.querySelector(".categoria-badge");
            const categoria = badgeCategoria?.textContent || "";
            const categoriaId = badgeCategoria?.dataset.categoria || "";
            const estacao = card.querySelector("[data-estacao]")?.textContent || "";
            const correspondeBusca = !termo || normalizar(`${nome} ${categoria} ${estacao}`).includes(termo);
            const correspondeCategoria = categoriaSelecionada === "todas"
                || categoriaId === categoriaSelecionada;
            const corresponde = correspondeBusca && correspondeCategoria;
            card.hidden = !corresponde;
            if (corresponde) encontrados += 1;
        });

        const mensagemBusca = mensagemBuscaRef.current;
        if (mensagemBusca) {
            mensagemBusca.hidden = encontrados > 0 || (!termo && categoriaSelecionada === "todas");
            mensagemBusca.textContent = encontrados > 0
                ? ""
                : termo
                    ? `Nenhum produto encontrado para "${termoBusca}".`
                    : "Nenhum produto nesta categoria.";
        }
    }, [termoBusca, categoriaSelecionada]);

    const adicionarAoCarrinho = (event) => {
        const card = event.currentTarget.closest(".card");
        const item = {
            id: card.querySelector("h3").textContent.trim(),
            nome: card.querySelector("h3").textContent.trim(),
            categoria: card.querySelector(".categoria-badge").textContent.trim(),
            preco: Number(card.querySelector(".preco").textContent.replace("R$", "").replace(".", "").replace(",", ".").trim()),
            imagem: card.querySelector("img").src,
            quantidade: quantidades[card.dataset.indice] || 1,
        };
        const carrinhoAtual = JSON.parse(localStorage.getItem("auraviva-carrinho") || "[]");
        const itemExistente = carrinhoAtual.find((produto) => produto.id === item.id);
        const carrinhoAtualizado = itemExistente
            ? carrinhoAtual.map((produto) => produto.id === item.id
                ? { ...produto, quantidade: produto.quantidade + item.quantidade }
                : produto)
            : [...carrinhoAtual, item];

        localStorage.setItem("auraviva-carrinho", JSON.stringify(carrinhoAtualizado));
        event.currentTarget.textContent = "Adicionado";
        window.setTimeout(() => {
            event.currentTarget.textContent = "Adicionar ao Carrinho";
        }, 1200);
    };

    const alterarQuantidade = (indice, variacao) => {
        setQuantidades((atuais) => ({
            ...atuais,
            [indice]: Math.max(1, (atuais[indice] || 1) + variacao),
        }));
    };

  return (
    <>
            <div className="container">
                <MenuAuraviva />

                <div className={styles.catalogLayout}>
                    <aside className={styles.catalogSidebar} aria-label="Filtros do catálogo">
                        <h2 className={styles.catalogTitle}>Catálogo</h2>
                        <section className={styles.filterSection}>
                            <h3 className={styles.filterHeading}>Categoria</h3>
                            <div className={styles.filterOptions}>
                                {[
                                    { id: "todas", label: "Todos os produtos" },
                                    { id: "vegetais", label: "Vegetais" },
                                    { id: "leguminosas", label: "Leguminosas" },
                                    { id: "frutas", label: "Frutas" },
                                    { id: "graos", label: "Grãos" },
                                    { id: "flores", label: "Flores" },
                                    { id: "outros", label: "Outros cultivos" },
                                ].map((categoria) => (
                                    <button
                                        key={categoria.id}
                                        type="button"
                                        className={`${styles.filterOption} ${categoriaSelecionada === categoria.id ? styles.filterOptionActive : ""}`}
                                        aria-pressed={categoriaSelecionada === categoria.id}
                                        onClick={() => setCategoriaSelecionada(categoria.id)}
                                    >
                                        {categoria.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </aside>

                    <main className={styles.catalogResults}>
                        <p ref={mensagemBuscaRef} className={styles.emptyResults} role="status" hidden />
                        <div className="cards" ref={cardsRef}>
                    <div className="card" data-indice="0">
                        <img src="https://agristar.com.br/upload/products/original/04529.jpg" alt="Milho Doce" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Milho Doce</h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(0, -1)}>-</button>
                                <span>{quantidades[0] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(0, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="1">
                        <img src="https://images.pexels.com/photos/37730751/pexels-photo-37730751/free-photo-of-tomates-cereja-frescos-em-uma-tigela-branca.jpeg" alt="Tomate Cereja" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Tomate Cereja</h3>
                            <p className="preco">R$ 12,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(1, -1)}>-</button>
                                <span>{quantidades[1] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(1, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="2">
                        <img src="https://images.pexels.com/photos/30803822/pexels-photo-30803822/free-photo-of-natureza-morta-com-pimentoes-vermelhos.jpeg" alt="Pimentão Vermelho" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Pimentão Vermelho</h3>
                            <p className="preco">R$ 11,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(2, -1)}>-</button>
                                <span>{quantidades[2] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(2, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="3">
                        <img src="https://images.pexels.com/photos/37058364/pexels-photo-37058364.jpeg?cs=srgb&dl=pexels-sasif-awan-520122311-37058364.jpg&fm=jpg" alt="Pimentão Amarelo" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Pimentão Amarelo</h3>
                            <p className="preco">R$ 11,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(3, -1)}>-</button>
                                <span>{quantidades[3] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(3, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="4">
                        <img src="https://img.magnific.com/fotos-gratis/pepinos-maduros-frescos-na-placa-de-madeira_114579-68778.jpg?semt=ais_hybrid&w=740&q=80" alt="Pepino Japonês" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Pepino Japonês</h3>
                            <p className="preco">R$ 9,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(4, -1)}>-</button>
                                <span>{quantidades[4] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(4, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="5">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z8X0WSAjmaAEtVrIRj_KKAKyqgqnaJzwFA&s" alt="Abóbora Cabotiá" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Abóbora Cabotiá</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(5, -1)}>-</button>
                                <span>{quantidades[5] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(5, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="6">
                        <img src="https://imagens.isla.com.br/isla/producao/71p06-51104.jpg" alt="Cebola Baia Periforme" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Cebola Baia Periforme</h3>
                            <p className="preco">R$ 8,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(6, -1)}>-</button>
                                <span>{quantidades[6] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(6, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="7">
                        <img src="https://images.tcdn.com.br/img/img_prod/905552/brocolis_ramoso_organico_p_entregas_a_partir_de_terca_feira_2035_1_f80d87e6d51b6babb8cdf031971ec957.jpg" alt="Brócolis Ramoso" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Brócolis Ramoso</h3>
                            <p className="preco">R$ 10,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(7, -1)}>-</button>
                                <span>{quantidades[7] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(7, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="8">
                        <img src="https://meuamigotemumsitio.com.br/wp-content/uploads/2023/04/Foto011920x1080-2-1024x576.webp" alt="Couve Manteiga" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Couve Manteiga</h3>
                            <p className="preco">R$ 8,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(8, -1)}>-</button>
                                <span>{quantidades[8] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(8, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="9">
                        <img src="https://www.petz.com.br/blog/wp-content/uploads/2022/11/como-plantar-pimenta-dedo-de-moca.jpg" alt="Pimenta Dedo-de-Moça" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Pimenta Dedo-de-Moça</h3>
                            <p className="preco">R$ 9,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(9, -1)}>-</button>
                                <span>{quantidades[9] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(9, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="10">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNxmwCv6JgpbzpmSiKw699sbXccsoAcRtGGvNkQTIXNuRRrTJIdmOaf4&s=10" alt="Ervilha" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Ervilha</h3>
                            <p className="preco">R$ 10,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(10, -1)}>-</button>
                                <span>{quantidades[10] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(10, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="11">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUqu3P59LcCmGHsF2YkWLYnjH_e8-Lvku3Et9eSmpSA&s=10" alt="Feijão Vagem" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Feijão Vagem</h3>
                            <p className="preco">R$ 12,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(11, -1)}>-</button>
                                <span>{quantidades[11] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(11, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="12">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRyjBpW_nN2mfx5kLpjRBXqh3Dr5yiMkxRjDVe98AAfY9tDq48W9qkX8&s=10" alt="Melância Crimson Sweet" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="frutas">Frutas</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Melância Crimson Sweet </h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(12, -1)}>-</button>
                                <span>{quantidades[12] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(12, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="13">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDl7HDgt3WqZ4pnIDivfb1tGakas6Jf6N6GF3402jvw&s=10" alt="Melão Amarelo" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="frutas">Frutas</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Melão Amarelo</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(13, -1)}>-</button>
                                <span>{quantidades[13] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(13, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="14">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopwgSjr8I1rJunqasNBleDNBBkcahpuV-uPFUKudPsg&s=10" alt="Alface Crespa" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Alface Crespa</h3>
                            <p className="preco">R$ 7,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(14, -1)}>-</button>
                                <span>{quantidades[14] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(14, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="15">
                        <img src="https://www.sitiodamata.com.br/media/catalog/product/cache/02a967fa0e464fd60865ccf512e40f92/c/e/cenoura-brasilia-agroeconomico-2-2-e1494768491984.jpg" alt="Cenoura Brasília" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Cenoura Brasília</h3>
                            <p className="preco">R$ 8,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(15, -1)}>-</button>
                                <span>{quantidades[15] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(15, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="16">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdJL4r0CxfWtfZWR19ZSAuqlpttz3uHYEb9OmeWajYA&s=10" alt="Sementes de Soja" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Soja</h3>
                            <p className="preco">R$ 15,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(16, -1)}>-</button>
                                <span>{quantidades[16] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(16, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="17">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiPpZHEhcNo1XDdyQ_26eMLjYWYFwXxKlXFmxuVuPPQ&s=10" alt="Sementes de Algodão" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="outros">Outros cultivos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Algodão</h3>
                            <p className="preco">R$ 16,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(17, -1)}>-</button>
                                <span>{quantidades[17] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(17, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="18">
                        <img src="https://blog.syngentadigital.ag/wp-content/uploads/2018/09/cana-de-acucar.jpeg" alt="Sementes de Cana-de-açúcar" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="outros">Outros cultivos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Cana-de-açúcar</h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(18, -1)}>-</button>
                                <span>{quantidades[18] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(18, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="19">
                        <img src="https://cdn.awsli.com.br/2500x2500/998/998380/produto/36839968/sementes-milho-itapoa-rara-cg42m32mcs.jpeg" alt="Sementes de Milho Amarelo" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="graos">Grãos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Milho Amarelo</h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(19, -1)}>-</button>
                                <span>{quantidades[19] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(19, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="20">
                        <img src="https://www.thjardins.com.br/wp-content/uploads/2026/07/zea-mays-tennessee-red-cob-co-130731689.jpg" alt="Sementes de Milho Branco" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="graos">Grãos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Milho Branco</h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(20, -1)}>-</button>
                                <span>{quantidades[20] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(20, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="21">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTkGMjDvE8R6h_7Karv-Hw4fEXvOEY1gjc6afQNAONw&s=10" alt="Sementes de Feijão Carioca" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Feijão Carioca</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(21, -1)}>-</button>
                                <span>{quantidades[21] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(21, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="22">
                        <img src="https://a-static.mlcdn.com.br/450pxx450px/feijao-preto-ipr-urutau-5-kg-de-sementes/jokisementes/1c7b2026cb7111ed840a4201ac185033/a299fe2dde15381a9cf86dd539dc92c2.jpeg" alt="Sementes de Feijão Preto" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Feijão Preto</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(22, -1)}>-</button>
                                <span>{quantidades[22] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(22, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="23">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWda2Um9EOKfzxtnFup-HiQ1ASttD43KIf62WoVKzUOw&s=10" alt="Sementes de Sorgo" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="graos">Grãos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Sorgo</h3>
                            <p className="preco">R$ 15,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(23, -1)}>-</button>
                                <span>{quantidades[23] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(23, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="24">
                        <img src="https://s2-casaejardim.glbimg.com/p5EWKnajG4PdkUPsuV3GKP3H0ug=/0x0:667x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/U/0/BsZ0X9QbCHnbE9ckg9jw/girassois-de-flores-florescendo-na-exploracao-agricola-coloque-com-ceu-azul-fundo-colorido-natural-bonito.jpg" alt="Sementes de Girassol" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="flores">Flores</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Girassol</h3>
                            <p className="preco">R$ 16,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(24, -1)}>-</button>
                                <span>{quantidades[24] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(24, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="25">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30uM5vGqW8rn1vqJn2evzBPYBkKiNNIc68S_Se3dXMubiTRWm-H1F1Nc&s=10" alt="Sementes de Trigo" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="graos">Grãos</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Trigo</h3>
                            <p className="preco">R$ 12,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(25, -1)}>-</button>
                                <span>{quantidades[25] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(25, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="26">
                        <img src="https://thumbs.dreamstime.com/b/semente-do-arroz-e-gr%C3%A3o-tailandesas-da-mistura-25369891.jpg" alt="Sementes de Arroz" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="graos">Grãos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Arroz</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(26, -1)}>-</button>
                                <span>{quantidades[26] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(26, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="27">
                        <img src="https://s2-casaejardim.glbimg.com/abNumB_CkZubTrHRvRZHeGxHCx8=/0x0:620x455/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/E/v/Vq51oCQ7AqILB8usgOxQ/2020-01-17-gettyimages-182175899.jpeg" alt="Sementes de Beterraba" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Beterraba</h3>
                            <p className="preco">R$ 9,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(27, -1)}>-</button>
                                <span>{quantidades[27] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(27, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="28">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7SrjcNCNJqee2lo-f35ME-jLDiGTxHxjo-DP0B26J5ySXuURauvp_mqP&s=10" alt="Sementes de Canola" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="outros">Outros cultivos</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Canola</h3>
                            <p className="preco">R$ 14,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(28, -1)}>-</button>
                                <span>{quantidades[28] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(28, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="29">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNZIFLQfqsS83sLIuUNHUxwyUwihWFpWslVtTSHxQ3_JiIOY45b1hup4&s=10" alt="Sementes de Batata" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Batata</h3>
                            <p className="preco">R$ 11,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(29, -1)}>-</button>
                                <span>{quantidades[29] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(29, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="30">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcb7T81Xa4Zjk6N6SOzh_A4EaSarWREA3Wr3uY4F2F5A&s=10" alt="Sementes de Alfafa" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="outros">Outros cultivos</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Alfafa</h3>
                            <p className="preco">R$ 12,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(30, -1)}>-</button>
                                <span>{quantidades[30] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(30, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="31">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYTmk66lahznYQgksFGyVAeS0YMy3rlxgCFCln9DEZQ&s=10" alt="Sementes de Feijão Branco" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Feijão Branco</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(31, -1)}>-</button>
                                <span>{quantidades[31] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(31, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="32">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawxmIjhRb8bWOHw0jXWPMwLsSYt1iLbUo1rLcbq_g5gASFML-H03ahcXQ&s=10" alt="Sementes de Feijão Vermelho" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="leguminosas">Leguminosas</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Feijão Vermelho</h3>
                            <p className="preco">R$ 13,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(32, -1)}>-</button>
                                <span>{quantidades[32] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(32, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="33">
                        <img src="https://vasoeflor.cdn.magazord.com.br/img/2023/10/produto/1976/eucaliptos.jpg?ims=fit-in/800x800/filters:fill(white)" alt="Sementes de Eucalipto" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="outros">Outros cultivos</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Eucalipto</h3>
                            <p className="preco">R$ 17,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(33, -1)}>-</button>
                                <span>{quantidades[33] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(33, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="34">
                        <img src="https://res.cloudinary.com/dbw5mokn7/image/upload/v1779565712/borogodo/blog/post-mandioca-a-raiz-da-cozinha-brasileira.jpg" alt="Sementes de Algodão" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.summerBadge}`} data-estacao="verao">Verão</span>
                            </div>
                            <h3>Mandioca</h3>
                            <p className="preco">R$ 16,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(34, -1)}>-</button>
                                <span>{quantidades[34] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(34, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card" data-indice="35">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCBRrNNRuaAlKo8i0Q9rwiuHS5vWTp37PuIvXeAxsWqHz9U6Pk9wmVps&s=10" alt="Sementes de Batata-doce" />
                        <div className="info">
                            <div className={styles.productBadges}>
                                <span className="categoria-badge" data-categoria="vegetais">Vegetais</span>
                                <span className={`${styles.seasonBadge} ${styles.winterBadge}`} data-estacao="inverno">Inverno</span>
                            </div>
                            <h3>Batata-doce</h3>
                            <p className="preco">R$ 11,90</p>
                            <div className="quantidade">
                                <button type="button" onClick={() => alterarQuantidade(35, -1)}>-</button>
                                <span>{quantidades[35] || 1}</span>
                                <button type="button" onClick={() => alterarQuantidade(35, 1)}>+</button>
                            </div>
                            <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>

                    </main>
                </div>

                <footer className="footer">
                    <p>© 2025 Auraviva — Cultivando o futuro 🌿</p>
                </footer>
            </div>
        </>
    )
}

export default Produto