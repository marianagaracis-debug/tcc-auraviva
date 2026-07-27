import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"

const ListarProduto = () => {
  return (
    <>
            <div className="container">
                <MenuFuncionario />
        <style>{`
        .card{
    background:white;
    border-radius:6px;
    overflow:hidden;
    box-shadow:0 2px 10px rgba(0,0,0,.1);
    transition:.3s;
    width:18rem;
    display:flex;
    flex-direction:column;
    height:100%;
}

        .container{
    font-family: "Times New Roman", Times, serif;
}

        .cards{
    display:grid;
    grid-template-columns: repeat(4, 18rem);
    gap:16px;
    justify-content:center;
    margin-top:40px;
    margin-bottom:80px;
}
 
.card:hover{
    transform:translateY(0px);
}
 
.card img{
    width:100%;
    height:300px;
    object-fit:cover;
    flex-shrink:0;
}
 
.info{
    padding:8px;
    display:flex;
    flex-direction:column;
    flex:1;
    justify-content:space-between;
}
 
.info h3{
    color:#333;
    margin-bottom:10px;
    min-height:48px;
}
 
.preco{
    color:#4CAF50;
    font-size:20px;
    margin-bottom:8px;
}
 
.card button{
    width:auto;
    background:#333;
    color:white;
    border:none;
    padding:4px 8px;
    font-size:12px;
    cursor:pointer;
    border-radius:5px;
    margin-top:auto;
    align-self:flex-start;
}

.card button:hover{
    background:#4CAF50;
}
.footer {
background-color: #010801;
text-align: center;
padding: 20px;
color: white;
font-size: 0.9rem;
width: 100vw;
margin-left: calc(50% - 50vw);
box-sizing: border-box;
}

        `}</style>

                <div className="cards">
                    <div className="card">
                        <img src="https://agristar.com.br/upload/products/original/04529.jpg" alt="Milho Doce" />
                        <div className="info">
                            <h3>Milho Doce</h3>
                            <p className="preco">R$ 14,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://images.pexels.com/photos/37730751/pexels-photo-37730751/free-photo-of-tomates-cereja-frescos-em-uma-tigela-branca.jpeg" alt="Tomate Cereja" />
                        <div className="info">
                            <h3>Tomate Cereja</h3>
                            <p className="preco">R$ 12,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://images.pexels.com/photos/30803822/pexels-photo-30803822/free-photo-of-natureza-morta-com-pimentoes-vermelhos.jpeg" alt="Pimentão Vermelho" />
                        <div className="info">
                            <h3>Pimentão Vermelho</h3>
                            <p className="preco">R$ 11,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://images.pexels.com/photos/37058364/pexels-photo-37058364.jpeg?cs=srgb&dl=pexels-sasif-awan-520122311-37058364.jpg&fm=jpg" alt="Pimentão Amarelo" />
                        <div className="info">
                            <h3>Pimentão Amarelo</h3>
                            <p className="preco">R$ 11,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://img.magnific.com/fotos-gratis/pepinos-maduros-frescos-na-placa-de-madeira_114579-68778.jpg?semt=ais_hybrid&w=740&q=80" alt="Pepino Japonês" />
                        <div className="info">
                            <h3>Pepino Japonês</h3>
                            <p className="preco">R$ 9,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z8X0WSAjmaAEtVrIRj_KKAKyqgqnaJzwFA&s" alt="Abóbora Cabotiá" />
                        <div className="info">
                            <h3>Abóbora Cabotiá</h3>
                            <p className="preco">R$ 13,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://imagens.isla.com.br/isla/producao/71p06-51104.jpg" alt="Cebola Baia Periforme" />
                        <div className="info">
                            <h3>Cebola Baia Periforme</h3>
                            <p className="preco">R$ 8,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://images.tcdn.com.br/img/img_prod/905552/brocolis_ramoso_organico_p_entregas_a_partir_de_terca_feira_2035_1_f80d87e6d51b6babb8cdf031971ec957.jpg" alt="Brócolis Ramoso" />
                        <div className="info">
                            <h3>Brócolis Ramoso</h3>
                            <p className="preco">R$ 10,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://meuamigotemumsitio.com.br/wp-content/uploads/2023/04/Foto011920x1080-2-1024x576.webp" alt="Couve Manteiga" />
                        <div className="info">
                            <h3>Couve Manteiga</h3>
                            <p className="preco">R$ 8,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://www.petz.com.br/blog/wp-content/uploads/2022/11/como-plantar-pimenta-dedo-de-moca.jpg" alt="Pimenta Dedo-de-Moça" />
                        <div className="info">
                            <h3>Pimenta Dedo-de-Moça</h3>
                            <p className="preco">R$ 9,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNxmwCv6JgpbzpmSiKw699sbXccsoAcRtGGvNkQTIXNuRRrTJIdmOaf4&s=10" alt="Ervilha" />
                        <div className="info">
                            <h3>Ervilha</h3>
                            <p className="preco">R$ 10,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUqu3P59LcCmGHsF2YkWLYnjH_e8-Lvku3Et9eSmpSA&s=10" alt="Feijão Vagem" />
                        <div className="info">
                            <h3>Feijão Vagem</h3>
                            <p className="preco">R$ 12,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRyjBpW_nN2mfx5kLpjRBXqh3Dr5yiMkxRjDVe98AAfY9tDq48W9qkX8&s=10" alt="Melância Crimson Sweet" />
                        <div className="info">
                            <h3>Melância Crimson Sweet </h3>
                            <p className="preco">R$ 14,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDl7HDgt3WqZ4pnIDivfb1tGakas6Jf6N6GF3402jvw&s=10" alt="Melão Amarelo" />
                        <div className="info">
                            <h3>Melão Amarelo</h3>
                            <p className="preco">R$ 13,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopwgSjr8I1rJunqasNBleDNBBkcahpuV-uPFUKudPsg&s=10" alt="Alface Crespa" />
                        <div className="info">
                            <h3>Alface Crespa</h3>
                            <p className="preco">R$ 7,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://www.sitiodamata.com.br/media/catalog/product/cache/02a967fa0e464fd60865ccf512e40f92/c/e/cenoura-brasilia-agroeconomico-2-2-e1494768491984.jpg" alt="Cenoura Brasília" />
                        <div className="info">
                            <h3>Cenoura Brasília</h3>
                            <p className="preco">R$ 8,90</p>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <p>© 2025 Auraviva — Cultivando o futuro 🌿</p>
                </footer>
            </div>
        </>
    )
}

export default ListarProduto