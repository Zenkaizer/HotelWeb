import React from "react";
import './Clients_managers.css';
import user_logo from '../../assets/images/user_logo.png';
import edit_logo from '../../assets/images/edit_logo.png';
//import Toolbar from '@mui/icons-material';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';

function Clients_managers() {
    return (

        <div>
            <div className="navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {/*<img src={tree_stripe} className="tree_stripe" alt="tree_stripe" />*/}
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
            <body>


                <h1 className="titulo_listado">Listado de clientes</h1>
                <section className="mt-8">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th className="text-gray-600">RUT/DNI</th>
                                <th className="text-gray-600">Nombre</th>
                                <th className="text-gray-600">Apellido</th>
                                <th className="text-gray-600">Nacionalidad</th>
                                <th className="text-gray-600">Teléfono</th>
                                <th className="text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="text-gray-600 pr-4">210292187</td>
                            <td className="text-gray-600 pr-4">Christian</td>
                            <td className="text-gray-600 pr-4">San Juan</td>
                            <td className="text-gray-600 pr-4">Chilena</td>
                            <td className="text-gray-600 pr-4">949494949</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">230384323</td>
                            <td className="text-gray-600 pr-4">Juan</td>
                            <td className="text-gray-600 pr-4">Cruz</td>
                            <td className="text-gray-600 pr-4">Venezolana</td>
                            <td className="text-gray-600 pr-4">928372612</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">234567899</td>
                            <td className="text-gray-600 pr-4">Emily</td>
                            <td className="text-gray-600 pr-4">Smith</td>
                            <td className="text-gray-600 pr-4">Estadounidense</td>
                            <td className="text-gray-600 pr-4">982618364</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">3456789012</td>
                            <td className="text-gray-600 pr-4">Luisa</td>
                            <td className="text-gray-600 pr-4">Silva</td>
                            <td className="text-gray-600 pr-4">Brasileña</td>
                            <td className="text-gray-600 pr-4">982618364</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">345322368</td>
                            <td className="text-gray-600 pr-4">Elena</td>
                            <td className="text-gray-600 pr-4">Martinez</td>
                            <td className="text-gray-600 pr-4">Argentina</td>
                            <td className="text-gray-600 pr-4">928372817</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">453654723</td>
                            <td className="text-gray-600 pr-4">Fernando</td>
                            <td className="text-gray-600 pr-4">Prado</td>
                            <td className="text-gray-600 pr-4">Mexicana</td>
                            <td className="text-gray-600 pr-4">927826482</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="text-gray-600 pr-4">198273927</td>
                            <td className="text-gray-600 pr-4">Catalina</td>
                            <td className="text-gray-600 pr-4">Perez</td>
                            <td className="text-gray-600 pr-4">Chilena</td>
                            <td className="text-gray-600 pr-4">928273612</td>
                            <td className="text-gray-600 pr-4">
                                <div className="button_cliente">
                                    <button className="editar_cliente">
                                        <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <div className="button_cliente">
                    <button className="registrar_cliente">Registrar Cliente
                    </button>
                </div>

                {/*<TextField />*/}


            </body>
        </div>



    );
}
export default Clients_managers;