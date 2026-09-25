import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"
import styles from "./SementesDeVerao.module.css"

const SementesDeVerao = () => {
  return (
    <div className="container">
      <MenuAuraviva />
      {/* Hero com vídeo */}
      <section className={styles["hero-video"]}>
        <video autoPlay muted loop className={styles["video-bg"]}>
          <source src="https://www.pexels.com/pt-br/download/video/5487208/" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
 
        <h1>Explore a coleção <span>vibrante</span> de plantas que florescem sob o sol. Perfeitas para quem ama energia, cor e vitalidade no ambiente.</h1>
      </section>
 
      <section className={styles.cards}>
        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/34342701/pexels-photo-34342701.jpeg" alt="Hibisco" />
          <div className={styles["card-content"]}>
            <h3>Hibisco</h3>
            <p>Colorido, tropical e repleto de vida. Um símbolo de calor e alegria.</p>
            <button className={styles["buy-btn"]}>Comprar</button>
          </div>
        </div>
 
        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/8829110/pexels-photo-8829110.jpeg" alt="Girassol" />
          <div className={styles["card-content"]}>
            <h3>Girassol</h3>
            <p>Gira em direção à luz — perfeita para trazer energia positiva ao ambiente.</p>
            <button className={styles["buy-btn"]}>Comprar</button>
          </div>
        </div>
 
        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg" alt="Lavanda" />
          <div className={styles["card-content"]}>
            <h3>Lavanda</h3>
            <p>Beleza e aroma em uma planta que traz calma e frescor.</p>
            <button className={styles["buy-btn"]}>Comprar</button>
          </div>
        </div>

      </section>
 
      <footer>
        © 2025 Auraviva | Cresça com propósito 🌿
      </footer>
    </div>
  )
}

export default SementesDeVerao