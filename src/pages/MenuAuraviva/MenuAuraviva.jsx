import { Link } from "react-router-dom"
import styles from "./MenuAuraviva.module.css"

const MenuAuraviva = () => {

return(

    <div className={styles.menuWrapper}>
<nav className={`navbar navbar-expand-lg navbar-light p-2 shadow-sm w-100 ${styles.menu}`}>
 
 <a className={`navbar-brand ${styles.logo}`} href="/auraviva/funcionario/home">
 Auraviva
 </a>
 
 {/* Botão Hamburguer para telas menores */}
 <button
 className="navbar-toggler"
 type="button"
 data-bs-toggle="collapse"
 data-bs-target="#navbarSupportedContent"
 aria-controls="navbarSupportedContent"
 aria-expanded="false"
 aria-label="Toggle navigation"
 >

 <span className="navbar-toggler-icon"></span>
 </button>
 <div className="collapse navbar-collapse" id="navbarSupportedContent">
 <ul className="navbar-nav me-auto">
 <li className="nav-item active">
 <a className={`nav-link ${styles.itemMenu}`} href="/auraviva/funcionario/produtos">
 Produtos
 </a>
 </li>
 <li className="nav-item">
 <Link className={`nav-link ${styles.itemMenu}`} to="/auraviva/blog">
 Blog
 </Link>
 </li>
 <li className={`nav-item ${styles.sementesMenu}`}>
 <button className={`nav-link ${styles.itemMenu} ${styles.sementesButton}`} type="button">
 Sementes
 <span className={styles.arrow}>▾</span>
 </button>
 <ul className={styles.sementesSubmenu}>
 <li>
 <a href="/auraviva/funcionario/sementes-de-verao">Sementes de Verão</a>
 </li>
 <li>
 <a href="/auraviva/funcionario/sementes-de-inverno">Sementes de Inverno</a>
 </li>
 </ul>
 </li>
 </ul>
 <div className={styles.navActions}>
 <form className={styles.searchForm} onSubmit={(event) => event.preventDefault()}>
 <input type="search" placeholder="Pesquisar" aria-label="Pesquisar" />
 <button type="submit" aria-label="Pesquisar">
 <span className="material-symbols-outlined">search</span>
 </button>
 </form>
 <a className={styles.actionIcon} href="/auraviva/funcionario/produtos" aria-label="Carrinho">
 <span className="material-symbols-outlined">shopping_bag</span>
 </a>
 <a className={styles.actionIcon} href="#" aria-label="Perfil do usuário">
 <span className="material-symbols-outlined">account_circle</span>
 </a>
 <Link className={styles.loginButton} to="/auraviva/login">Log in</Link>
 </div>
 </div>
 </nav>

    </div>
)

}

export default MenuAuraviva