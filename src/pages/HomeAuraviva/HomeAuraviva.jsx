import { useState } from "react";
import { Link } from "react-router-dom";
import MenuAuraviva from "../MenuAuraviva/MenuAuraviva";
import styles from "./HomeAuraviva.module.css";

const perguntas = [
  ["O que é a Auraviva?", "A Auraviva é uma empresa especializada na revenda de sementes para o setor agrícola."],
  ["Como posso entrar em contato?", "Você pode entrar em contato através do nosso formulário ou e-mail."],
  ["O que fazer caso o lacre esteja violado?", "Devolva o produto imediatamente e solicite o reembolso."],
  ["Como escolher a melhor semente?", "Considere a estação, o clima da sua região e o tipo de cultivo desejado."],
];

const HomeAuraviva = () => {
  const [faqAberto, setFaqAberto] = useState(null);

  return (
    <div className={styles.page}>
      <MenuAuraviva />

      <section className={styles.heroVideo}>
        <video autoPlay muted loop className={styles.videoBg}>
          <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>

        <div className={styles.heroContent}>
          <h1>
            Cultivando um futuro que <span>impulsiona</span> a vida.
          </h1>
          <Link to="/auraviva/funcionario/produtos" className={styles.btn}>
            Explorar Sementes
          </Link>
        </div>
      </section>

      <section className={styles.about}>
        <h2>Sobre Nós</h2>
        <p>
          A <strong>Auraviva</strong> é uma empresa especializada na revenda de sementes
          para o setor agrícola. Nosso objetivo é oferecer sementes de qualidade, com
          procedência confiável e tecnologia que contribua para uma produção mais eficiente.
        </p>
        <p>
          Buscamos atender nossos clientes com responsabilidade, bom atendimento e compromisso
          com a qualidade dos produtos.
        </p>
      </section>

      <section className={`${styles.cards} container`}>
        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/2850521/pexels-photo-2850521.jpeg" alt="Sementes de verão" />
          <h3>Sementes de Verão</h3>
          <p>Descubra espécies que florescem sob o sol e trazem energia ao seu jardim.</p>
          <Link to="/auraviva/funcionario/sementes-de-verao" className={styles.btn}>Explorar</Link>
        </div>

        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/7538372/pexels-photo-7538372.jpeg" alt="Produtos" />
          <h3>Produtos</h3>
          <p>Veja nossos produtos e encontre sementes para o seu cultivo.</p>
          <Link to="/auraviva/funcionario/produtos" className={styles.btn}>Ver mais</Link>
        </div>

        <div className={styles.card}>
          <img src="https://images.pexels.com/photos/10150783/pexels-photo-10150783.jpeg" alt="Sementes de inverno" />
          <h3>Sementes de Inverno</h3>
          <p>Explore plantas resistentes para as estações frias.</p>
          <Link to="/auraviva/funcionario/sementes-de-inverno" className={styles.btn}>Explorar</Link>
        </div>
      </section>

      <main className={styles.faqContainer}>
        <h1 className={styles.faqTitle}>Perguntas Frequentes</h1>
        <p className={styles.subtitulo}>Confira as dúvidas mais comuns.</p>

        {perguntas.map(([pergunta, resposta], indice) => (
          <div
            key={pergunta}
            className={`${styles.faq} ${faqAberto === indice ? styles.ativo : ""}`}
          >
            <button
              type="button"
              className={styles.pergunta}
              onClick={() => setFaqAberto(faqAberto === indice ? null : indice)}
            >
              {pergunta}
              <span>{faqAberto === indice ? "−" : "+"}</span>
            </button>
            <div className={styles.resposta}>
              <p>{resposta}</p>
            </div>
          </div>
        ))}
      </main>

      <section className={styles.contato}>
        <div className={styles.overlay}>
          <h2>FALE CONOSCO</h2>
          <p>Tem alguma dúvida ou deseja fazer um pedido? Entre em contato conosco.</p>

          <form className={styles.formulario} onSubmit={(event) => event.preventDefault()}>
            <div className={styles.linha}>
              <input type="text" placeholder="Nome" required />
              <input type="email" placeholder="E-mail" required />
            </div>
            <input type="tel" placeholder="Telefone" required />
            <textarea rows="5" placeholder="Mensagem" />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <div className={styles.footerColumns}>
          <div className={styles.footerCol}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>lightbulb</span>
            <h3>Nossa Loja</h3>
            <p><strong>Endereço:</strong> Auraviva</p>
            <p>Setor agrícola, Brasil</p>
            <p><strong>Email:</strong> contato@auraviva.com</p>
          </div>

          <div className={styles.footerCol}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>campaign</span>
            <h3>Companhia</h3>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Sugestões</a></li>
              <li><a href="#">Catálogo de Produtos</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>forum</span>
            <h3>Siga-nos</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>edit_note</span>
            <h3>Ajuda</h3>
            <ul>
              <li><a href="#">Termos e Condições</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.subscribeBox}>
            <span className={`material-symbols-outlined ${styles.subscribeIcon}`}>send</span>
            <h3>Inscreva-se</h3>
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="Digite seu e-mail" aria-label="Digite seu e-mail" required />
              <button type="submit">Inscreva-se agora</button>
            </form>
          </div>

          <div className={styles.paymentInfo}>
            <h3>Informações de Pagamento</h3>
            <p>Aceitamos os principais métodos de pagamento, incluindo cartão, PIX e PayPal.</p>
            <div className={styles.paymentBrands}>
              <span className={styles.paymentBrand}>VISA</span>
              <span className={`${styles.paymentBrand} ${styles.mastercard}`}>Mastercard</span>
              <span className={`${styles.paymentBrand} ${styles.elo}`}>elo</span>
              <span className={`${styles.paymentBrand} ${styles.pix}`}>PIX</span>
              <span className={`${styles.paymentBrand} ${styles.paypal}`}>PayPal</span>
              <span className={styles.paymentBrand}>AMEX</span>
              <span className={styles.paymentBrand}>Hipercard</span>
            </div>
          </div>
        </div>

        <div className={styles.footerCopyright}>
          <br />
          © {new Date().getFullYear()} Auraviva. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default HomeAuraviva
