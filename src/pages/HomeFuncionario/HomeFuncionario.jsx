import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
import {Link} from "react-router-dom";

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

        /* === SOBRE NÓS === */
        .about {
          background: transparent;
          color: white;
          padding: 60px 10%;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          font-size: 1.2rem;
        }

        .about h2 {
          font-family: 'Playfair Display', serif;
          color: white;
          margin-bottom: 20px;
        }

        .about p {
          font-family: 'Times New Roman', Times, serif;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Cards */
        .cards {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: stretch;
          gap: 30px;
          padding: 60px 10%;
          overflow-x: auto;
        }

        .card {
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 300px;
          font-family: "Times New Roman", Times, serif;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
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
          /* allow text to take available space so button can align to bottom */
          flex: 1 1 auto;
        }

        .card .btn {
          margin: 20px 0;
          background-color: #66bb6a;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 20px;
          display: inline-block;
          /* ensure button stays at the bottom */
          align-self: center;
          margin-top: auto;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Contato */
        .contato {
          background: linear-gradient(135deg, #000000c2 0%, #000000bd 100%);
          padding: 80px 10%;
          display: flex;
          font-family: "Times New Roman", Times, serif;
          justify-content: center;
          align-items: center;
          min-height: 600px;
          margin-bottom: 40px;
        }

        .overlay {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 50px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .overlay h2 {
          color: #334d34;
          font-size: 2.2rem;
          margin-bottom: 15px;
          text-align: center;
          font-weight: 600;
        }

        .overlay > p {
          color: #666;
          text-align: center;
          margin-bottom: 30px;
          font-size: 1.05rem;
        }

        .formulario {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .linha {
          display: flex;
          gap: 15px;
        }

        .linha input {
          flex: 1;
        }

        .formulario input,
        .formulario textarea {
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          transition: 0.3s;
          background: #fafafa;
        }

        .formulario input:focus,
        .formulario textarea:focus {
          outline: none;
          border-color: #3e2dda;
          background: white;
          box-shadow: 0 0 8px rgba(68, 250, 78, 0.2);
        }

        .formulario textarea {
          resize: vertical;
          min-height: 120px;
        }

        .formulario button {
          padding: 14px 32px;
          background: linear-gradient(135deg, #95c097 0%, #0b180b 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .formulario button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 187, 106, 0.3);
        }

        .formulario button:active {
          transform: translateY(0);
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
          <p>A <strong>Auraviva</strong> é uma empresa especializada na revenda de sementes transgênicas para o setor agrícola.
Nosso objetivo é oferecer sementes de qualidade, com procedência confiável e tecnologia que contribua para uma produção mais eficiente.</p>
<br/>
<p> Buscamos atender nossos clientes com responsabilidade, bom atendimento e compromisso com a qualidade dos produtos.
Acreditamos que a inovação e a tecnologia são importantes para o desenvolvimento da agricultura e para o crescimento do agronegócio.</p>
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
          <img src="https://images.pexels.com/photos/7538372/pexels-photo-7538372.jpeg" alt="Produtos" />
          <h3>Produtos</h3>
          <p>Veja como cada compra ajuda a levar vida e esperança a quem precisa.</p>
          <Link to ="/produtos" className="btn">Ver mais</Link>
        </div>

        <div className="card">
          <img src="https://images.pexels.com/photos/10150783/pexels-photo-10150783.jpeg" alt="Sementes de Inverno" />
          <h3>Sementes de Inverno</h3>
          <p>Explore plantas resistentes e elegantes para as estações frias.</p>
          <a href="/categoria/inverno" className="btn">Explorar</a>
        </div>
      </section>

      <section className="contato">

        <div className="overlay">

          <h2>FALE CONOSCO</h2>

          <p>Tem alguma dúvida ou deseja fazer um pedido? Entre em contato conosco.</p>

          <form className="formulario">

            <div className="linha">

              <input type="text" placeholder="Nome *" required />

              <input type="email" placeholder="E-mail *" required />

            </div>

            <input type="tel" placeholder="Telefone *" required />

            <textarea

              rows="5"

              placeholder="Mensagem"

            ></textarea>

            <button type="submit">Enviar</button>

          </form>

        </div>

      </section>

      <footer className="footer">
        <p>© 2025 Auraviva — Cultivando o futuro 🌿</p>
      </footer>
    </div>
  )
}

export default HomeFuncionario