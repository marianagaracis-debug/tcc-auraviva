import { Link } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import styles from "./Blog.module.css";

const videos = [
  {
    titulo: "Como funcionam as sementes artificiais?",
    descricao: "Entenda a tecnologia, a composição e as possibilidades para um cultivo mais previsível.",
    imagem: "https://images.pexels.com/photos/450516/pexels-photo-450516.jpeg",
    duracao: "08 min",
  },
  {
    titulo: "Sementes artificiais no campo",
    descricao: "Veja como o planejamento e a escolha do material ajudam a reduzir perdas na produção.",
    imagem: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
    duracao: "12 min",
  },
  {
    titulo: "Armazenamento e conservação",
    descricao: "Boas práticas para manter os materiais protegidos até o momento do plantio.",
    imagem: "https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg",
    duracao: "06 min",
  },
];

const artigos = [
  {
    categoria: "Tecnologia",
    titulo: "O futuro do cultivo começa na semente",
    texto: "Conheça os avanços que estão aproximando ciência, rastreabilidade e produtividade.",
  },
  {
    categoria: "Planejamento",
    titulo: "Quando escolher uma semente artificial?",
    texto: "Uma visão prática dos critérios que ajudam a decidir qual solução faz sentido para cada cultivo.",
  },
  {
    categoria: "Sustentabilidade",
    titulo: "Precisão para produzir melhor",
    texto: "Como o uso consciente de tecnologia pode contribuir para um campo mais eficiente.",
  },
];

const materiais = [
  ["Guia de introdução às sementes artificiais", "PDF · 2,4 MB"],
  ["Checklist de armazenamento e transporte", "PDF · 860 KB"],
  ["Glossário de cultivo e tecnologia", "PDF · 1,1 MB"],
];

const Blog = () => (
  <div className={styles.page}>
    <MenuAuraviva />

    <main>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Auraviva / conhecimento</span>
          <h1>Ideias que fazem o cultivo avançar.</h1>
          <p>
            Vídeos, artigos e materiais para entender as sementes artificiais e tomar decisões mais seguras no campo.
          </p>
        </div>
        <div className={styles.heroNote}>
          <span className="material-symbols-outlined">eco</span>
          <strong>Aprenda no seu ritmo</strong>
          <span>Conteúdo selecionado para quem cultiva com propósito.</span>
        </div>
      </section>

      <section className={styles.featureShelf} aria-labelledby="destaques-titulo">
        <div className={styles.shelfHeader}>
          <div>
            <span className={styles.shelfEyebrow}>Auraviva em movimento</span>
            <h2 id="destaques-titulo">Conteúdos em destaque</h2>
          </div>
          <span className={styles.shelfHandle}>@auraviva sementes</span>
        </div>
        <div className={styles.shelfTrack}>
          {videos.map((video) => (
            <button type="button" className={styles.shelfItem} key={`destaque-${video.titulo}`}>
              <img src={video.imagem} alt="Conteúdo sobre cultivo" />
              <span className={styles.shelfPlay}>
                <span className="material-symbols-outlined">play_arrow</span>
              </span>
            </button>
          ))}
          <button type="button" className={`${styles.shelfItem} ${styles.shelfItemAccent}`}>
            <span className="material-symbols-outlined">article</span>
            <strong>Novos artigos<br />toda semana</strong>
          </button>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="videos-titulo">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.kicker}>Assista</span>
            <h2 id="videos-titulo">Vídeos explicativos</h2>
          </div>
          <span className={styles.counter}>03 episódios</span>
        </div>

        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <article className={styles.videoCard} key={video.titulo}>
              <div className={styles.videoCover}>
                <img src={video.imagem} alt="Plantas em cultivo" />
                <button type="button" className={styles.playButton} aria-label={`Assistir: ${video.titulo}`}>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <span className={styles.duration}>{video.duracao}</span>
              </div>
              <div className={styles.cardBody}>
                <h3>{video.titulo}</h3>
                <p>{video.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.resources} aria-labelledby="materiais-titulo">
        <div className={styles.resourceIntro}>
          <span className={styles.kicker}>Leve com você</span>
          <h2 id="materiais-titulo">Arquivos úteis</h2>
          <p>Materiais rápidos para consultar no escritório, na estufa ou no campo.</p>
        </div>
        <div className={styles.fileList}>
          {materiais.map(([titulo, detalhe]) => (
            <a href="#" className={styles.fileItem} key={titulo} onClick={(event) => event.preventDefault()}>
              <span className="material-symbols-outlined">description</span>
              <span>
                <strong>{titulo}</strong>
                <small>{detalhe}</small>
              </span>
              <span className="material-symbols-outlined">download</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="artigos-titulo">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.kicker}>Leia</span>
            <h2 id="artigos-titulo">Artigos em destaque</h2>
          </div>
          <Link to="/auraviva/funcionario/home" className={styles.textLink}>Voltar para início</Link>
        </div>
        <div className={styles.articleGrid}>
          {artigos.map((artigo) => (
            <article className={styles.articleCard} key={artigo.titulo}>
              <span className={styles.articleCategory}>{artigo.categoria}</span>
              <h3>{artigo.titulo}</h3>
              <p>{artigo.texto}</p>
              <button type="button" className={styles.readButton}>Ler artigo <span aria-hidden="true">→</span></button>
            </article>
          ))}

        </div>
      </section>
    </main>
     <footer>
          © 2025 Auraviva | Cresça com propósito 🌿
        </footer>
  </div>
);

export default Blog;
