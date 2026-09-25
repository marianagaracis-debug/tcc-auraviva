import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"
import styles from "./SementesDeInverno.module.css"

const SementesDeInverno = () => {

return(
<div className="container">
        <MenuAuraviva/>
      <div>
        {/* Hero com vídeo */}
        <section className={styles["hero-video"]}>
          <video autoPlay muted loop playsInline className={styles["video-bg"]}>
            <source src="https://www.pexels.com/pt-br/download/video/10286825/" type="video/mp4" />
            Seu navegador não suporta vídeos em HTML5.
          </video>
 
          <h1>Descubra a beleza das plantas que florescem nas estações <span>frias.</span> Resistentes, elegantes e cheias de serenidade.</h1>
        </section>
        <section className={styles.cards}>
          <div className={styles.card}>
            <img src="https://dicasdeplantas.com.br/wp-content/uploads/2023/12/camelia02.jpg" alt="Camélia" />
            <div className={styles["card-content"]}>
              <h3>Camélia</h3>
              <p>Uma flor clássica e elegante que floresce mesmo nos dias mais frios.</p>
              <button className={styles["buy-btn"]}>Comprar</button>
            </div>
          </div>
 
          <div className={styles.card}>
            <img src="https://images.pexels.com/photos/7717990/pexels-photo-7717990.jpeg" alt="Azaleia" />
            <div className={styles["card-content"]}>
              <h3>Azaleia</h3>
              <p>Vibrante e resistente, perfeita para trazer cor ao inverno.</p>
              <button className={styles["buy-btn"]}>Comprar</button>
            </div>
          </div>
 
          <div className={styles.card}>
            <img src="https://blog.plantie.com.br/wp-content/uploads/2022/09/Planta-hera-como-cuidar.png" alt="Hera" />
            <div className={styles["card-content"]}>
              <h3>Hera</h3>
              <p>Simboliza força e persistência, ideal para o frio intenso.</p>
              <button className={styles["buy-btn"]}>Comprar</button>
            </div>
          </div>

        </section>
 
        <footer>
          © 2025 Auraviva | Cresça com propósito 🌿
        </footer>
      </div>
    </div>
  )
}

export default SementesDeInverno