import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"

const Estoque = () => {

return(
<div className="container">
        <MenuFuncionario/>
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
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  max-width: 700px;
  line-height: 1.2;
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
  font-family: 'Playfair Display', serif;
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
      display: flex;
      flex-direction: column;
      height: 100%;
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
      flex: 1;
    }
 
    .card-content h3 {
      color: #112031;
      font-size: 1.4rem;
    }
 
    .card-content p {
      font-size: 0.9rem;
      color: #345b63;
      margin: 0.5rem 0 1rem;
      flex: 1;
    }
 
    .buy-btn {
      background: #345b63;
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
      background: #112031;
    }
 
    footer {
      text-align: center;
      padding: 2rem;
      background: rgb(2, 1, 1);
      backdrop-filter: blur(8px);
      margin-top: 3rem;
      color: #feffff;
      font-size: 0.9rem;
    }
    `}</style>
      <div>
        {/* Hero com vídeo */}
        <section className="hero-video">
          <video autoPlay muted loop playsInline className="video-bg">
            <source src="https://www.pexels.com/pt-br/download/video/10286825/" type="video/mp4" />
            Seu navegador não suporta vídeos em HTML5.
          </video>
 
          <h1>Descubra a beleza das plantas que florescem nas estações <span>frias.</span> Resistentes, elegantes e cheias de serenidade.</h1>
        </section>
        <section className="cards">
          <div className="card">
            <img src="https://dicasdeplantas.com.br/wp-content/uploads/2023/12/camelia02.jpg" alt="Camélia" />
            <div className="card-content">
              <h3>Camélia</h3>
              <p>Uma flor clássica e elegante que floresce mesmo nos dias mais frios.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>
 
          <div className="card">
            <img src="https://images.pexels.com/photos/7717990/pexels-photo-7717990.jpeg" alt="Azaleia" />
            <div className="card-content">
              <h3>Azaleia</h3>
              <p>Vibrante e resistente, perfeita para trazer cor ao inverno.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>
 
          <div className="card">
            <img src="https://blog.plantie.com.br/wp-content/uploads/2022/09/Planta-hera-como-cuidar.png" alt="Hera" />
            <div className="card-content">
              <h3>Hera</h3>
              <p>Simboliza força e persistência, ideal para o frio intenso.</p>
              <button className="buy-btn">Comprar</button>
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

export default Estoque