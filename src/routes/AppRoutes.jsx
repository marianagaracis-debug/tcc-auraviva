import{
    BrowserRouter,
    Routes,
    Route,
    Navigate
}from "react-router-dom"

import HomeAuraviva from "../pages/HomeAuraviva/HomeAuraviva"
import Blog from "../pages/Blog/Blog"
import LogIn from "../pages/LogIn/LogIn"
import Produto from "../pages/Produto/Produto"
import Carrinho from "../pages/Carrinho/Carrinho"
import SementesDeInverno from "../pages/SementesDeInverno/SementesDeInverno"
import SementesDeVerao from "../pages/SementesDeVerao/SementesDeVerao"
import Perfil from "../pages/Perfil/Perfil"

const AppRoutes = () => {
    return(
    <BrowserRouter>
    <Routes>

    <Route
    path="/"
    element={<HomeAuraviva/>}
    />

    <Route
    path="/auraviva/funcionario/home"
    element={<HomeAuraviva/>}
    />

    <Route
    path="/auraviva/login"
    element={<LogIn/>}
    />

    <Route
    path="/auraviva/blog"
    element={<Blog/>}
    />

    <Route
    path="/auraviva/funcionario/produtos"
    element={<Produto/>}
    />

    <Route
    path="/auraviva/carrinho"
    element={<Carrinho/>}
    />

    <Route
    path="/auraviva/perfil"
    element={<Perfil/>}
    />

    <Route
    path="/auraviva/funcionario/sementes-de-inverno"
    element={<SementesDeInverno/>}
    />

    

    <Route
    path="/auraviva/funcionario/sementes-de-verao"
    element={<SementesDeVerao/>}
    />



    </Routes>

    </BrowserRouter>
    )
}

export default AppRoutes