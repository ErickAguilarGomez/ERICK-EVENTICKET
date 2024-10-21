

import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logito.png";
import people from "../../img/people.png";
import fondo from "../../img/fondoazul.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import Swal from "sweetalert2";

export const Login = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleDataUser = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleIsAdmin = () => {
        setIsAdmin(!isAdmin);
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        if(isAdmin){
        const success = await actions.loginAdmin(data.email, data.password);

        if (success) {
            Swal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
            });
            navigate("/demo");
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error al iniciar sesión',
                icon: 'error',
            });
        }
    }
    };

    const handleUserLogin = async (e) => {
        if(!isAdmin){
        e.preventDefault();
        const success = await actions.loginUser(data.email, data.password);

        if (success) {
            Swal.fire({
                icon: 'success',
                title: success,
                confirmButtonText: 'Ok'
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Verifica tus credenciales.',
                confirmButtonText: 'Ok '
            });
        }
    }
    };

    useEffect(() => {
        if (store.accessToken) navigate("/demo");
        if (store.adminToken) navigate("/");
    }, [store.adminToken, store.accessToken]);

    return (
        <div
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundColor: "#4038E6",
                height: "100vh",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="container w-75 mt-5 shadow">
                <div className="row align-items-stretch">
                    <div
                        className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"
                        style={{
                            backgroundImage: `url(${people})`,
                            height: "90vh"
                        }}
                    ></div>

                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src={logo} className="rounded-pill" width="40" alt="" />
                        </div>

                        {!isAdmin ? (
                            <>
                                <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                                    Bienvenidos a Eventicket
                                </h2>
                                <form onSubmit={handleUserLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control login"
                                            value={data.email}
                                            onChange={handleDataUser}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control login"
                                            value={data.password}
                                            onChange={handleDataUser}
                                            required
                                        />
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                                    </div>

                                    <div className="my-3 d-flex align-items-center justify-content-center flex-column text-center">
                                        <Link to="/registro">
                                            Aún no tienes cuenta? Regístrate aqui.
                                        </Link>
                                        <div onClick={handleIsAdmin} className="linkTo">
                                            Ingresar como Administrador
                                        </div>
                                        <Link to="/contrasena">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                                    Bienvenido administrador
                                </h2>
                                <form onSubmit={handleAdminLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control login"
                                            value={data.email}
                                            onChange={handleDataUser}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control login"
                                            value={data.password}
                                            onChange={handleDataUser}
                                            required
                                        />
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center flex-column text-center">
                                        <button type="submit" className="btn btn-primary mb-4">Iniciar Sesión</button>
                                        <div onClick={handleIsAdmin} className="linkTo">
                                            Iniciar Sesión como Usuario
                                        </div>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};