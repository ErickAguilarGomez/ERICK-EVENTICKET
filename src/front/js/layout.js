import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";
import { BackendURL } from "./component/backendURL";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/Footer.jsx";

import { Home } from "./pages/home";
import { Login } from "./pages/Login.jsx";
import { Registro } from "./pages/Registro.jsx";
import { RecuperarContraseña } from "./pages/RecuperarContraseña.jsx";
import { RestablecerContraseña } from "./pages/RestablecerContraseña.jsx";

import { Demo } from "./pages/demo";
import EditarEvento from "./component/editarEvento.jsx"

import DashboardUser from "./pages/DashboardUser.jsx";
import Favourites from "./pages/Favourites.jsx";
import { DetalleEvento } from "./component/DetalleEvento.jsx";
import { ConfirmacionCompra } from "./component/confirmacionCompra.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<DetalleEvento />} path="/detalle/:eventId" />
                        <Route element={<DashboardUser />} path="/user" />
                        <Route element={<RecuperarContraseña />} path="/contrasena" />
                        <Route path="/restablecer/" element={<RestablecerContraseña />} />
                        <Route element={<EditarEvento />} path="/editarEvento/:id" />
                        <Route element={<Favourites />} path="/favourites" />
                        <Route element={<ConfirmacionCompra />} path="/confirmacionCompra" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
