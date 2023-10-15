import React from "react";
import './Clients_managers.css';
import tree_stripe from '../../assets/images/tree_lines_logo.png';
import user_logo from '../../assets/images/user_logo.png';

function Clients_managers() {
    return (

        <div className="navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={tree_stripe} className="tree_stripe" alt="tree_stripe" />
                <img src={user_logo} className="user_logon" alt="user_logon" />
                <div className="container-fluid">

                    <div className="container-text"></div>
                        <h1 className="option1">Gestionar clientes</h1>
                        <h1 className="option2">Registrar Habitación</h1>
                        <h1 className="option3">Gestionar reservas</h1>

                    {/*<a className="navbar-brand" href="#">Navbar</a>*/}
                </div>

            </nav>
        </div>
    );
}
export default Clients_managers;