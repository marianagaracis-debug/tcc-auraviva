import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"

const Categoria = () => {
  return (
    <div className="container">
      <MenuFuncionario />
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
          justify-content: flex-start;
          padding: 2.5rem 0 0 8%;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.6);
          animation: fadeIn 2s ease;
        }

        .hero-video h1 {
          font-size: 3rem;
          max-width: 700px;
          line-height: 1.2;
        }

        .hero-video h1 span {
          color: #66bb6a;
        }

        .hero-video .btn {
          margin-top: 20px;
          padding: 12px 28px;
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

        /* ===== CARDS ===== */
        .cards {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding: 16px 8%;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          overflow: hidden;
          width: 220px; /* reduced size */
          transition: transform 0.2s ease;
        }

        .card:hover { transform: translateY(-6px); }

        .card img {
          width: 100%;
          height: 140px; /* reduced image height */
          object-fit: cover;
          display: block;
        }

        .card-content {
          padding: 8px 10px;
        }

        .card-content h3 { font-size: 1rem; margin: 6px 0; }
        .card-content p { font-size: 0.85rem; margin: 4px 0 10px; color: #555; }

        .buy-btn {
          padding: 8px 14px;
          background: #66bb6a;
          color: #fff;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}</style>

        <section className="hero-video">
        <video autoPlay muted loop className="video-bg">
          <source src="https://www.pexels.com/pt-br/download/video/6243223/" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
        </section>

      <section id="verao">
        <div className="hero-video">
          <h1>Explore a coleção <span>vibrante</span> de plantas que florescem sob o sol.</h1>
        </div>

        <section className="cards">
          <div className="card">
            <img src="https://images.pexels.com/photos/34342701/pexels-photo-34342701.jpeg" alt="Hibisco" />
            <div className="card-content">
              <h3>Hibisco</h3>
              <p>Colorido, tropical e repleto de vida.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.pexels.com/photos/8829110/pexels-photo-8829110.jpeg" alt="Girassol" />
            <div className="card-content">
              <h3>Girassol</h3>
              <p>Energia positiva para o ambiente.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg" alt="Lavanda" />
            <div className="card-content">
              <h3>Lavanda</h3>
              <p>Beleza e aroma refrescante.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>
        </section>
      </section>

      <section id="inverno">
        <div className="hero-video">
          <h1>Descubra a beleza das plantas que florescem nas estações <span>frias</span>.</h1>
        </div>

        <section className="cards">
          <div className="card">
            <img src="https://dicasdeplantas.com.br/wp-content/uploads/2023/12/camelia02.jpg" alt="Camélia" />
            <div className="card-content">
              <h3>Camélia</h3>
              <p>Elegante e resistente ao frio.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>

          <div className="card">
            <img src="https://images.pexels.com/photos/7717990/pexels-photo-7717990.jpeg" alt="Azaleia" />
            <div className="card-content">
              <h3>Azaleia</h3>
              <p>Perfeita para trazer cor ao inverno.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>

          <div className="card">
            <img src="https://blog.plantie.com.br/wp-content/uploads/2022/09/Planta-hera-como-cuidar.png" alt="Hera" />
            <div className="card-content">
              <h3>Hera</h3>
              <p>Simboliza força e persistência.</p>
              <button className="buy-btn">Comprar</button>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Categoria