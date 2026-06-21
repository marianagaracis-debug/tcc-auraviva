import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"

const HomeFuncionario = () => {
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

        /* === SOBRE NÓS === */
        .about {
          background: transparent;
          color: white;
          padding: 60px 10%;
          text-align: center;
        }

        .about h2 {
          font-family: 'Playfair Display', serif;
          color: white;
          margin-bottom: 20px;
        }

        .about p {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Cards */
        .cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          padding: 60px 10%;
        }

        .card {
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 300px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card h3 {
          color: #2e7d32;
          margin-top: 15px;
        }

        .card p {
          padding: 0 15px;
          font-size: 0.95rem;
          color: #555;
        }

        .card .btn {
          margin: 20px 0;
          background-color: #66bb6a;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 20px;
          display: inline-block;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Footer */
        .footer {
          background-color: #010801;
          text-align: center;
          padding: 20px;
          color: white;
          font-size: 0.9rem;
        }
      `}</style>

      <section className="hero-video">
        <video autoPlay muted loop className="video-bg">
          <source src="https://www.pexels.com/pt-br/download/video/6243223/" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>

        <h1>Cultivando um futuro que <span>impulsiona</span> a vida.</h1>
        <a href="Categoria.jsx" className="btn">Explorar Sementes</a>
      </section>

      <section className="about">
        <div className="container">
          <h2>Sobre Nós</h2>
          <p>A <strong>Auraviva</strong> nasceu do desejo de unir tecnologia e natureza, oferecendo sementes artificiais inovadoras que ajudam comunidades e preservam o meio ambiente. Parte de nossos lucros é destinada a projetos de doação e reflorestamento.</p>
        </div>
      </section>

      <section className="cards container">
        <div className="card">
          <img src="https://images.pexels.com/photos/2850521/pexels-photo-2850521.jpeg" alt="Sementes de verão" />
          <h3>Sementes de Verão</h3>
          <p>Descubra espécies que florescem sob o sol e trazem energia ao seu jardim.</p>
          <a href="/categoria/verao" className="btn">Explorar</a>
        </div>

        <div className="card">
          <img src="https://images.pexels.com/photos/10150783/pexels-photo-10150783.jpeg" alt="Sementes de Inverno" />
          <h3>Sementes de Inverno</h3>
          <p>Explore plantas resistentes e elegantes para as estações frias.</p>
          <a href="/categoria/inverno" className="btn">Explorar</a>
        </div>

        <div className="card">
          <img src="https://images.pexels.com/photos/7538372/pexels-photo-7538372.jpeg" alt="Lucro e Doações" />
          <h3>Lucros e Doações</h3>
          <p>Veja como cada compra ajuda a levar vida e esperança a quem precisa.</p>
          <a href="/categoria/doacoes" className="btn">Ver mais</a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Auraviva — Cultivando o futuro 🌿</p>
      </footer>
    </div>
  )
}

export default HomeFuncionario