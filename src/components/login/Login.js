import React, { useState } from 'react';
import './Login.css';
import flechaImage from '../../assets/img/FlechaAtras-removebg-preview.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="background">
            <a href="">
                <img src={flechaImage} alt="Flecha Atrás" className="img-flecha" />
            </a>
            <div className="backgroundcomponents">
                <div className="Login">

                    <form>
                        <div className="form-group">
                            <label className="text">Correo</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="iniciar-sesion" onClick="">
                            Iniciar sesión
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};
export default Login;
