import{
    BrowserRouter,
    Routes,
    Route
}from "react-router-dom"

import HomeFuncionario from "../pages/HomeFuncionario/HomeFuncionario"
import ListarProduto from "../pages/ListarProduto/ListarProduto"
import Estoque from "../pages/Estoque/Estoque"
import Categoria from "../pages/Categoria/Categoria"


const AppRoutes = () => {
    return(
    <BrowserRouter>
    <Routes>

    <Route
    path="/"
    element={<HomeFuncionario/>}
    />

    <Route
    path="/pizzaria/funcionario/home"
    element={<HomeFuncionario/>}
    />

    <Route
    path="/pizzaria/funcionario/produtos"
    element={<ListarProduto/>}
    />

    <Route
    path="/pizzaria/funcionario/estoques"
    element={<Estoque/>}
    />

    <Route
    path="/pizzaria/funcionario/categorias"
    element={<Categoria/>}
    />



    </Routes>

    </BrowserRouter>
    )
}

export default AppRoutes