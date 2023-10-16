import './MainScreen.css';
import '../login/Login';
import React from 'react';
import { useNavigate} from "react-router-dom";

const MainScreen = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    }
    const redirectToRegister = () => {
        navigate("");
    }

    return (
        <div className="background">
            <div className="container-lg">
                <div>
                    <button className="buttons" onClick={redirectToLogin}   style={{ display: 'block' }}>
                        Iniciar Sesión
                    </button>
                </div>
            </div>

            <div className="container-lg">
                <div>
                    <button className="buttons" onClick={redirectToRegister} style={{ display: 'block' }}>
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainScreen;
