import MenuAuraviva from "../MenuAuraviva/MenuAuraviva"

const SementesDeVerao = () => {
  return (
    <div className="container">
      <MenuAuraviva />
      <style>{`
         /* ==== HERO COM VÍDEO ==== */
.video-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(60%);
}
 
.hero-video {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 8%;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.6);
  animation: fadeIn 2s ease;
}
 
.hero-video h1 {
  font-size: 3rem;
  max-width: 700px;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
}
 
.hero-video h1 span {
  color: #66bb6a;
}
 
.hero-video .btn {
  margin-top: 25px;
  padding: 14px 32px;
  background: #66bb6a;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
}
 
.hero-video .btn:hover {
  background: #4caf50;
  transform: scale(1.05);
}
 
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
 
 
    .cards {
      font-family: "Times New Roman", Times, serif;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 3rem;
    }
 
    .card {
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      overflow: hidden;
      transition: 0.4s;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
 
    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
 
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
 
    .card-content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      min-height: 220px;
    }
 
    .card-content h3 {
      color: #0a3d2f;
      font-size: 1.4rem;
    }
 
    .card-content p {
      font-size: 0.9rem;
      color: #225f4d;
      margin: 0.5rem 0 1rem;
      flex: 1;
    }
 
    .buy-btn {
      background: #146356;
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-top: auto;
      align-self: flex-start;
    }
 
    .buy-btn:hover {
      background: #0a3d2f;
    }
 
    footer {
      background-color: #010801;
      text-align: center;
      padding: 20px;
      color: white;
      font-size: 0.9rem;
      width: 100vw;
      margin-left: calc(50% - 50vw);
      box-sizing: border-box;
      margin-top: 3rem;
    }
      `}</style>
      {/* Hero com vídeo */}
      <section className="hero-video">
        <video autoPlay muted loop className="video-bg">
          <source src="https://www.pexels.com/pt-br/download/video/5487208/" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
 
        <h1>Explore a coleção <span>vibrante</span> de plantas que florescem sob o sol. Perfeitas para quem ama energia, cor e vitalidade no ambiente.</h1>
      </section>
 
      <section className="cards">
        <div className="card">
          <img src="https://images.pexels.com/photos/34342701/pexels-photo-34342701.jpeg" alt="Hibisco" />
          <div className="card-content">
            <h3>Hibisco</h3>
            <p>Colorido, tropical e repleto de vida. Um símbolo de calor e alegria.</p>
            <button className="buy-btn">Comprar</button>
          </div>
        </div>
 
        <div className="card">
          <img src="https://images.pexels.com/photos/8829110/pexels-photo-8829110.jpeg" alt="Girassol" />
          <div className="card-content">
            <h3>Girassol</h3>
            <p>Gira em direção à luz — perfeita para trazer energia positiva ao ambiente.</p>
            <button className="buy-btn">Comprar</button>
          </div>
        </div>
 
        <div className="card">
          <img src="https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg" alt="Lavanda" />
          <div className="card-content">
            <h3>Lavanda</h3>
            <p>Beleza e aroma em uma planta que traz calma e frescor.</p>
            <button className="buy-btn">Comprar</button>
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