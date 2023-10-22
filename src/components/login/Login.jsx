import React, { useState } from 'react';
import './Login.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import { useNavigate} from "react-router-dom";

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
