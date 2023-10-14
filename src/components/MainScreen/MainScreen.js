import './MainScreen.css';
import '../login/Login';
import React from 'react';

const MainScreen = () => {

    return (
        <div className="background">
            <div className="container-lg">
                <div>
                    <button className="buttons" onClick="" style={{ display: 'block' }}>
                        Iniciar sesión
                    </button>
                </div>
            </div>

            <div className="container-lg">
                <div>
                    <button className="buttons" onClick="" style={{ display: 'block' }}>
                        Registrarse
                    </button>
                </div>
            </div>


        </div>
    );
};

export default MainScreen;
