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
import {useFormik} from "formik";
import {registerSchema} from "../../schemas";
import {InputLabel} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Clients_managers.css";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/index";
import { toast } from "react-toastify";
import axios from "axios";

function Clients_managers() {

    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:9000/users')
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                console.error('Error consiguiendo clientes:', error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            dni: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            nationality: "",
            birthDate: "",
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            axios.post('http://localhost:9000/users', values)
                .then((response) => {
                    console.log('Cliente registrado:', response.data);
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error al registrar cliente:', error);
                    console.log(values);
                });
        },
    });

    useEffect(() => {
        if (isModalOpen) {
            formik.resetForm();
        }
    }, [isModalOpen]);

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
                                <td className="text-gray-600 pr-4">{client.dni}</td>
                                <td className="text-gray-600 pr-4">{client.name}</td>
                                <td className="text-gray-600 pr-4">{client.lastName}</td>
                                <td className="text-gray-600 pr-4">{client.nationality}</td>
                                <td className="text-gray-600 pr-4">{client.phone}</td>
                                <td className="text-gray-600 pr-4">
                                    <img src={edit_logo} className="edit_logon" alt="edit_logon" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <div className="Button">
                    <Button className="registrarCliente" onClick={openModal}>
                        Registrar Cliente
                    </Button>
                </div>


                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-contenido">
                            <span className="cerrar-modal" onClick={closeModal}>
                                &times;
                            </span>
                            <h2>Registro de Cliente</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <InputLabel htmlFor="dni">RUT/DNI</InputLabel>
                                <TextField
                                    name="dni"
                                    value={formik.values.dni}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dni && Boolean(formik.errors.dni)}
                                    helperText={formik.touched.dni && formik.errors.dni}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextField
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="password">Contraseña</InputLabel>
                                <TextField
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="firstName">Nombre</InputLabel>
                                <TextField
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="lastName">Apellido</InputLabel>
                                <TextField
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="phone">Teléfono</InputLabel>
                                <TextField
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="nationality">Nacionalidad</InputLabel>
                                <TextField
                                    name="nationality"
                                    value={formik.values.nationality}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                                    helperText={formik.touched.nationality && formik.errors.nationality}
                                />
                                <h1>  </h1>
                                <InputLabel htmlFor="birthDate">Fecha de nacimiento</InputLabel>
                                <TextField
                                    name="birthDate"
                                    type="date"
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                                />
                                <h1>  </h1>
                                <Button type="submit">Registrar</Button>
                            </form>
                        </div>
                    </div>
                )}


            </body>
        </div>

    );
}
export default Clients_managers;
