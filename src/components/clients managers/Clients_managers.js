import React, {useEffect, useState} from "react";
import './Clients_managers.css';
import user_logo from '../../assets/images/user_logo.png';
import edit_logo from '../../assets/images/edit_logo.png';
//import Toolbar from '@mui/icons-material';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import axios from "axios";

function Clients_managers() {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/users')
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
            });
    }, []);
    return (
        <div>
            <div className="navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src={user_logo} className="user_logon" alt="user_logon" />
                    <div className="container-fluid">
                        <div className="container-text"></div>
                        <h1 className="option1">Gestionar clientes</h1>
                        <h1 className="option2">Registrar Habitación</h1>
                        <h1 className="option3">Gestionar reservas</h1>
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
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td className="text-gray-600 pr-4">{client.rut}</td>
                                <td className="text-gray-600 pr-4">{client.nombre}</td>
                                <td className="text-gray-600 pr-4">{client.apellido}</td>
                                <td className="text-gray-600 pr-4">{client.nacionalidad}</td>
                                <td className="text-gray-600 pr-4">{client.telefono}</td>
                                <td className="text-gray-600 pr-4">
                                    <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <div className="Button">
                    <Button className="registrarCliente">Registrar Cliente
                    </Button>
                </div>
            </body>
        </div>

    );
}
export default Clients_managers;