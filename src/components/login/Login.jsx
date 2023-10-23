import React, { useState } from 'react';
import './Login.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const redirectToMain = () => {
        navigate("/");
    }


    const iconStyle = {
        fontSize: 50,
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        axios.post('/api/login', user)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Inicio de sesión exitoso:', response.data);
                    navigate("/"); // PANTALLA
                } else {
                    toast.error("Credenciales incorrectas. Inténtalo de nuevo.");
                }
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión:', error);
                toast.error("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
            });
    }

    return (
        <div className="background">

            <div className="img-flecha">
                <IconButton onClick={redirectToMain}>
                    <ArrowBackIcon style={iconStyle} />
                </IconButton>
            </div>

            <div className="backgroundcomponents">
                <div className="Login">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Correo</label>
                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Contraseña</label>
                            <input
                                type="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="iniciar-sesion" onClick={handleLogin}>
                            Iniciar sesión
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};
export default Login;
