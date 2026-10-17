import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"
import { obterProdutosAtivos } from "../../utils/gestaoLoja";
import styles from "./Produto.module.css";

export const produtos = [
    {"nome":"Milho Doce","imagem":"https://agristar.com.br/upload/products/original/04529.jpg","alt":"Milho Doce","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Tomate Cereja","imagem":"https://images.pexels.com/photos/37730751/pexels-photo-37730751/free-photo-of-tomates-cereja-frescos-em-uma-tigela-branca.jpeg","alt":"Tomate Cereja","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 12,90"},
    {"nome":"Pimentão Vermelho","imagem":"https://images.pexels.com/photos/30803822/pexels-photo-30803822/free-photo-of-natureza-morta-com-pimentoes-vermelhos.jpeg","alt":"Pimentão Vermelho","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 11,90"},
    {"nome":"Pimentão Amarelo","imagem":"https://images.pexels.com/photos/37058364/pexels-photo-37058364.jpeg?cs=srgb&dl=pexels-sasif-awan-520122311-37058364.jpg&fm=jpg","alt":"Pimentão Amarelo","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 11,90"},
    {"nome":"Pepino Japonês","imagem":"https://img.magnific.com/fotos-gratis/pepinos-maduros-frescos-na-placa-de-madeira_114579-68778.jpg?semt=ais_hybrid&w=740&q=80","alt":"Pepino Japonês","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 9,90"},
    {"nome":"Abóbora Cabotiá","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z8X0WSAjmaAEtVrIRj_KKAKyqgqnaJzwFA&s","alt":"Abóbora Cabotiá","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 13,90"},
    {"nome":"Cebola Baia Periforme","imagem":"https://imagens.isla.com.br/isla/producao/71p06-51104.jpg","alt":"Cebola Baia Periforme","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 8,90"},
    {"nome":"Brócolis Ramoso","imagem":"https://images.tcdn.com.br/img/img_prod/905552/brocolis_ramoso_organico_p_entregas_a_partir_de_terca_feira_2035_1_f80d87e6d51b6babb8cdf031971ec957.jpg","alt":"Brócolis Ramoso","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 10,90"},
    {"nome":"Couve Manteiga","imagem":"https://meuamigotemumsitio.com.br/wp-content/uploads/2023/04/Foto011920x1080-2-1024x576.webp","alt":"Couve Manteiga","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 8,90"},
    {"nome":"Pimenta Dedo-de-Moça","imagem":"https://www.petz.com.br/blog/wp-content/uploads/2022/11/como-plantar-pimenta-dedo-de-moca.jpg","alt":"Pimenta Dedo-de-Moça","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 9,90"},
    {"nome":"Ervilha","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNxmwCv6JgpbzpmSiKw699sbXccsoAcRtGGvNkQTIXNuRRrTJIdmOaf4&s=10","alt":"Ervilha","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 10,90"},
    {"nome":"Feijão Vagem","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUqu3P59LcCmGHsF2YkWLYnjH_e8-Lvku3Et9eSmpSA&s=10","alt":"Feijão Vagem","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 12,90"},
    {"nome":"Melância Crimson Sweet","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRyjBpW_nN2mfx5kLpjRBXqh3Dr5yiMkxRjDVe98AAfY9tDq48W9qkX8&s=10","alt":"Melância Crimson Sweet","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Melão Amarelo","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDl7HDgt3WqZ4pnIDivfb1tGakas6Jf6N6GF3402jvw&s=10","alt":"Melão Amarelo","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 13,90"},
    {"nome":"Alface Crespa","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopwgSjr8I1rJunqasNBleDNBBkcahpuV-uPFUKudPsg&s=10","alt":"Alface Crespa","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 7,90"},
    {"nome":"Cenoura Brasília","imagem":"https://www.sitiodamata.com.br/media/catalog/product/cache/02a967fa0e464fd60865ccf512e40f92/c/e/cenoura-brasilia-agroeconomico-2-2-e1494768491984.jpg","alt":"Cenoura Brasília","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 8,90"},
    {"nome":"Soja","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUdJL4r0CxfWtfZWR19ZSAuqlpttz3uHYEb9OmeWajYA&s=10","alt":"Sementes de Soja","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"verao","estacao":"Verão","preco":"R$ 15,90"},
    {"nome":"Algodão","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiPpZHEhcNo1XDdyQ_26eMLjYWYFwXxKlXFmxuVuPPQ&s=10","alt":"Sementes de Algodão","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 16,90"},
    {"nome":"Cana-de-açúcar","imagem":"https://blog.syngentadigital.ag/wp-content/uploads/2018/09/cana-de-acucar.jpeg","alt":"Sementes de Cana-de-açúcar","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Milho Amarelo","imagem":"https://cdn.awsli.com.br/2500x2500/998/998380/produto/36839968/sementes-milho-itapoa-rara-cg42m32mcs.jpeg","alt":"Sementes de Milho Amarelo","categoriaId":"graos","categoria":"Grãos","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Milho Branco","imagem":"https://www.thjardins.com.br/wp-content/uploads/2026/07/zea-mays-tennessee-red-cob-co-130731689.jpg","alt":"Sementes de Milho Branco","categoriaId":"graos","categoria":"Grãos","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Feijão Carioca","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTkGMjDvE8R6h_7Karv-Hw4fEXvOEY1gjc6afQNAONw&s=10","alt":"Sementes de Feijão Carioca","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 13,90"},
    {"nome":"Feijão Preto","imagem":"https://a-static.mlcdn.com.br/450pxx450px/feijao-preto-ipr-urutau-5-kg-de-sementes/jokisementes/1c7b2026cb7111ed840a4201ac185033/a299fe2dde15381a9cf86dd539dc92c2.jpeg","alt":"Sementes de Feijão Preto","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 13,90"},
    {"nome":"Sorgo","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWda2Um9EOKfzxtnFup-HiQ1ASttD43KIf62WoVKzUOw&s=10","alt":"Sementes de Sorgo","categoriaId":"graos","categoria":"Grãos","estacaoId":"verao","estacao":"Verão","preco":"R$ 15,90"},
    {"nome":"Girassol","imagem":"https://s2-casaejardim.glbimg.com/p5EWKnajG4PdkUPsuV3GKP3H0ug=/0x0:667x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/U/0/BsZ0X9QbCHnbE9ckg9jw/girassois-de-flores-florescendo-na-exploracao-agricola-coloque-com-ceu-azul-fundo-colorido-natural-bonito.jpg","alt":"Sementes de Girassol","categoriaId":"flores","categoria":"Flores","estacaoId":"verao","estacao":"Verão","preco":"R$ 16,90"},
    {"nome":"Trigo","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30uM5vGqW8rn1vqJn2evzBPYBkKiNNIc68S_Se3dXMubiTRWm-H1F1Nc&s=10","alt":"Sementes de Trigo","categoriaId":"graos","categoria":"Grãos","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 12,90"},
    {"nome":"Arroz","imagem":"https://thumbs.dreamstime.com/b/semente-do-arroz-e-gr%C3%A3o-tailandesas-da-mistura-25369891.jpg","alt":"Sementes de Arroz","categoriaId":"graos","categoria":"Grãos","estacaoId":"verao","estacao":"Verão","preco":"R$ 13,90"},
    {"nome":"Beterraba","imagem":"https://s2-casaejardim.glbimg.com/abNumB_CkZubTrHRvRZHeGxHCx8=/0x0:620x455/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/E/v/Vq51oCQ7AqILB8usgOxQ/2020-01-17-gettyimages-182175899.jpeg","alt":"Sementes de Beterraba","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 9,90"},
    {"nome":"Canola","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7SrjcNCNJqee2lo-f35ME-jLDiGTxHxjo-DP0B26J5ySXuURauvp_mqP&s=10","alt":"Sementes de Canola","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 14,90"},
    {"nome":"Batata","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNZIFLQfqsS83sLIuUNHUxwyUwihWFpWslVtTSHxQ3_JiIOY45b1hup4&s=10","alt":"Sementes de Batata","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 11,90"},
    {"nome":"Alfafa","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcb7T81Xa4Zjk6N6SOzh_A4EaSarWREA3Wr3uY4F2F5A&s=10","alt":"Sementes de Alfafa","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 12,90"},
    {"nome":"Feijão Branco","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYTmk66lahznYQgksFGyVAeS0YMy3rlxgCFCln9DEZQ&s=10","alt":"Sementes de Feijão Branco","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 13,90"},
    {"nome":"Feijão Vermelho","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawxmIjhRb8bWOHw0jXWPMwLsSYt1iLbUo1rLcbq_g5gASFML-H03ahcXQ&s=10","alt":"Sementes de Feijão Vermelho","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 13,90"},
    {"nome":"Eucalipto","imagem":"https://vasoeflor.cdn.magazord.com.br/img/2023/10/produto/1976/eucaliptos.jpg?ims=fit-in/800x800/filters:fill(white)","alt":"Sementes de Eucalipto","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 17,90"},
    {"nome":"Mandioca","imagem":"https://res.cloudinary.com/dbw5mokn7/image/upload/v1779565712/borogodo/blog/post-mandioca-a-raiz-da-cozinha-brasileira.jpg","alt":"Sementes de Algodão","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 16,90"},
    {"nome":"Batata-doce","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCBRrNNRuaAlKo8i0Q9rwiuHS5vWTp37PuIvXeAxsWqHz9U6Pk9wmVps&s=10","alt":"Sementes de Batata-doce","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 11,90"},
    {"nome":"Aveia","imagem":"https://www.vitao.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/0/300015499_-_AVEIA_FLOCOS_FINOS_SEM_GLUTEN_170g_C12_-_7896863499876_-_V01.01_-_AI2.webp","alt":"Sementes de Aveia","categoriaId":"graos","categoria":"Grãos","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 12,90"},
    {"nome":"Cevada","imagem":"https://agro2.com.br/wp-content/uploads/2022/08/graos-de-cevada-1.jpg","alt":"Sementes de Cevada","categoriaId":"graos","categoria":"Grãos","estacaoId":"inverno","estacao":"Inverno","preco":"R$ 13,90"},
    {"nome":"Amendoim","imagem":"https://imageswscdn.wslojas.com.br/files/24600/produto-amendoim-ccasca-runner-a-granel-100gr-6532190717.webp","alt":"Sementes de Amendoim","categoriaId":"leguminosas","categoria":"Leguminosas","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Café","imagem":"https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80","alt":"Sementes de Café","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 18,90"},
    {"nome":"Cacau","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTEC8vUoS7qcFTwobC-bmlfM5aZph3Gc82v59-I9WHrUQqmRvcTXItRFAf&s=10","alt":"Sementes de Cacau","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 17,90"},
    {"nome":"Mamona","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIc2YCCZS3_gfj5BZNYWkIAGth3ghhkxlrsMlyU75MnhUuvv-OYzrie4A&s=10","alt":"Sementes de Mamona","categoriaId":"outros","categoria":"Outros cultivos","estacaoId":"verao","estacao":"Verão","preco":"R$ 15,90"},
    {"nome":"Pepino Caipira","imagem":"https://img.magnific.com/fotos-gratis/pepinos-maduros-frescos-na-placa-de-madeira_114579-68778.jpg?semt=ais_hybrid&w=740&q=80","alt":"Sementes de Pepino Caipira","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 9,90"},
    {"nome":"Pimentão Verde","imagem":"https://cdn.awsli.com.br/2500x2500/998/998380/produto/36843228/sementes-pimentao-verde-rara-znriencopd.jpeg","alt":"Sementes de Pimentão Verde","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 11,90"},
    {"nome":"Berinjela","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9yDIVuU2RTBVVxfozyGVT3MBzZegxcBaLZoKN1PrX_w&s=10","alt":"Sementes de Berinjela","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 10,90"},
    {"nome":"Abobrinha","imagem":"https://www.petz.com.br/blog/wp-content/uploads/2024/09/abobrinha_01-scaled.jpg","alt":"Sementes de Abobrinha","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 9,90"},
    {"nome":"Quiabo","imagem":"https://conteudo.imguol.com.br/blogs/171/files/2019/01/iStock-924389372-1024x683.jpg","alt":"Sementes de Quiabo","categoriaId":"vegetais","categoria":"Vegetais","estacaoId":"verao","estacao":"Verão","preco":"R$ 8,90"},
    {"nome":"Melão Cantaloupe","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQejAJoTDlcn0QJLGalUHCcLdyE9h3TaN5sR00UE9e2clgk4CN8M7bkeSpv&s=10","alt":"Sementes de Melão Cantaloupe","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
    {"nome":"Mamão","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxHeqbQI1izy3BUIbf3o1KGtbxw3bd6QQK3nagrBfQCg&s=10","alt":"Sementes de Mamão","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 13,90"},
    {"nome":"Maracujá","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhamWx8Mdq3bi463pLLMGYQ7DK_ACa2qo4f3-Jh3Zig&s=10","alt":"Sementes de Maracujá","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 12,90"},
    {"nome":"Abacaxi","imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbe5KIE2_JbMInpYQyfeAeVViZ_hwlQEBjcbx1sF8J9lxgOHyy4DQ5VVk&s=10","alt":"Mudas de Abacaxi","categoriaId":"frutas","categoria":"Frutas","estacaoId":"verao","estacao":"Verão","preco":"R$ 14,90"},
];

const Produto = () => {
    const [quantidades, setQuantidades] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cardsRef = useRef(null);
    const mensagemBuscaRef = useRef(null);
    const termoBusca = (searchParams.get("q") || "").trim();
    const produtosCatalogo = obterProdutosAtivos(produtos);

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

    const abrirDetalhes = (event) => {
        if (event.target.closest("button")) return;

        const card = event.target.closest(".card");
        if (!card) return;

        const nome = card.querySelector("h3").textContent.trim();
        const categoria = card.querySelector(".categoria-badge").textContent.trim();
        const estacao = card.querySelector("[data-estacao]").textContent.trim();

        setProdutoSelecionado({
            ...produtosCatalogo.find((produto) => produto.nome === nome),
            id: nome,
            nome,
            categoria,
            estacao,
            preco: card.querySelector(".preco").textContent.trim(),
            imagem: card.querySelector("img").src,
            descricao: produtosCatalogo.find((produto) => produto.nome === nome)?.descricao
                || `As sementes de ${nome} são uma escolha de qualidade para o cultivo de ${categoria.toLowerCase()}. Com bom potencial de desenvolvimento e adaptação para o ${estacao.toLowerCase()}, elas ajudam a transformar cada plantio em uma nova possibilidade.`,
        });
        setQuantidadeSelecionada(1);
    };

    const fecharDetalhes = () => setProdutoSelecionado(null);

    const adicionarSelecionadoAoCarrinho = () => {
        const item = {
            ...produtoSelecionado,
            preco: Number(produtoSelecionado.preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()),
            quantidade: quantidadeSelecionada,
        };
        const carrinhoAtual = JSON.parse(localStorage.getItem("auraviva-carrinho") || "[]");
        const itemExistente = carrinhoAtual.find((produto) => produto.id === item.id);
        const carrinhoAtualizado = itemExistente
            ? carrinhoAtual.map((produto) => produto.id === item.id
                ? { ...produto, quantidade: produto.quantidade + item.quantidade }
                : produto)
            : [...carrinhoAtual, item];

        localStorage.setItem("auraviva-carrinho", JSON.stringify(carrinhoAtualizado));
        fecharDetalhes();
    };

    const adicionarAListaDeDesejos = () => {
        const listaAtual = JSON.parse(localStorage.getItem("auraviva-wishlist") || "[]");
        const produtoJaSalvo = listaAtual.some((produto) => produto.id === produtoSelecionado.id);

        if (!produtoJaSalvo) {
            localStorage.setItem("auraviva-wishlist", JSON.stringify([...listaAtual, produtoSelecionado]));
        }

        fecharDetalhes();
        navigate("/auraviva/perfil?secao=desejos");
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
                        <div className="cards" ref={cardsRef} onClick={abrirDetalhes}>
                    {produtosCatalogo.map((produto, indice) => (
                        <div className="card" data-indice={indice} key={produto.nome}>
                            <img src={produto.imagem} alt={produto.alt} />
                            <div className="info">
                                <div className={styles.productBadges}>
                                    <span className="categoria-badge" data-categoria={produto.categoriaId}>{produto.categoria}</span>
                                    <span className={`${styles.seasonBadge} ${produto.estacaoId === "verao" ? styles.summerBadge : styles.winterBadge}`} data-estacao={produto.estacaoId}>{produto.estacao}</span>
                                </div>
                                <h3>{produto.nome}</h3>
                                <p className="preco">{produto.preco}</p>
                                <div className="quantidade">
                                    <button type="button" onClick={() => alterarQuantidade(indice, -1)}>-</button>
                                    <span>{quantidades[indice] || 1}</span>
                                    <button type="button" onClick={() => alterarQuantidade(indice, 1)}>+</button>
                                </div>
                                <button type="button" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    ))}
                    </div>

                {produtoSelecionado && (
                    <div className={styles.productOverlay} role="presentation" onClick={fecharDetalhes}>
                        <section
                            className={styles.productDetails}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="produto-detalhe-titulo"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className={styles.closeDetails}
                                onClick={fecharDetalhes}
                                aria-label="Fechar detalhes do produto"
                            >
                                ×
                            </button>

                            <div className={styles.productGallery}>
                                <img src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} />
                                <div className={styles.productThumbnails}>
                                    <img src={produtoSelecionado.imagem} alt="" />
                                </div>
                                <p>{produtoSelecionado.descricao}</p>
                            </div>

                            <div className={styles.productSummary}>
                                <span className={styles.detailCategory}>{produtoSelecionado.categoria}</span>
                                <h2 id="produto-detalhe-titulo">{produtoSelecionado.nome}</h2>
                                <p className={styles.detailPrice}>{produtoSelecionado.preco}</p>
                                <span className={styles.detailSeason}>{produtoSelecionado.estacao}</span>

                                <label htmlFor="quantidade-produto">Quantidade</label>
                                <div className={styles.detailQuantity} id="quantidade-produto">
                                    <button type="button" onClick={() => setQuantidadeSelecionada((atual) => Math.max(1, atual - 1))}>−</button>
                                    <span>{quantidadeSelecionada}</span>
                                    <button type="button" onClick={() => setQuantidadeSelecionada((atual) => atual + 1)}>+</button>
                                </div>

                                <div className={styles.detailActions}>
                                    <button type="button" className={styles.detailCartButton} onClick={adicionarSelecionadoAoCarrinho}>
                                        Adicionar ao Carrinho
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.wishlistButton}
                                        onClick={adicionarAListaDeDesejos}
                                        aria-label="Adicionar produto à lista de desejos"
                                        title="Adicionar à lista de desejos"
                                    >
                                        <span className="material-symbols-outlined">favorite_border</span>
                                    </button>
                                </div>
                                <button type="button" className={styles.detailBuyButton} onClick={adicionarSelecionadoAoCarrinho}>
                                    Comprar agora
                                </button>
                            </div>
                        </section>
                    </div>
                )}

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