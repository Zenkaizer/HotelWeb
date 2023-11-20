import './MainScreen.css';
import '../Login/Login';
import '../Register/Register';
import React from 'react';
import { useNavigate} from "react-router-dom";
import hotelImage from "../../assets/img/HOTEL.png";

const MainScreen = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    }
    const redirectToRegister = () => {
        navigate("/register");
    }

    return (
        <div className="backgroundmain">

            <div>
                <img src={hotelImage} alt="Hotel Logo" />
            </div>

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
