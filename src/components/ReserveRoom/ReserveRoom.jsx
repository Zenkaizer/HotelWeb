import React, { useEffect, useState } from "react";
import "./ReserveRoom.css";
import edit_logo from "../../assets/images/edit_logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import {reserveSchema} from "../../schemas/reserveSchema";

function ReserveRoom() {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:9000/rooms")
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Error consiguiendo las habitaciones:", error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            user: "",
            room: "",
            reserveDateTime: "",
            arriveDateTime: "",
            leaveDateTime: "",
            confirmed: "",
        },
        validationSchema: reserveSchema,
        onSubmit: (values) => {
            axios
                .post("http://localhost:9000/reserves", values)
                .then((response) => {
                    console.log("Reserva registrada:", response.data);
                    closeModal();
                })
                .catch((error) => {
                    console.error("Error al registrar cliente:", error);
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
            <body>
                <h1 className="titulo_listado">Listado de habitaciones</h1>
                <section className="mt-8">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th className="text-gray-600">Capacidad maxima</th>
                                <th className="text-gray-600">Camas simples</th>
                                <th className="text-gray-600">Camas dobles</th>
                                <th className="text-gray-600">Precio/noche</th>
                                <th className="text-gray-600">Baño privado</th>
                                <th className="text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room => (
                                <tr key={room.id}>
                                    <td className="text-gray-600 pr-4">{room.max_capacity}</td>
                                    <td className="text-gray-600 pr-4">{room.individual_beds}</td>
                                    <td className="text-gray-600 pr-4">{room.dual_beds}</td>
                                    <td className="text-gray-600 pr-4">{room.have_bathroom}</td>
                                    <td className="text-gray-600 pr-4">{room.price}</td>
                                    <td className="text-gray-600 pr-4">
                                        <img
                                            src={edit_logo}
                                            className="edit_logon"
                                            alt="edit_logon"
                                            onClick={openModal}
                                        />
                                    </td>
                                </tr>
                            )
                            ))}
                        </tbody>
                    </table>
                </section>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-contenido">
                            <span className="cerrar-modal" onClick={closeModal}>
                                &times;
                            </span>
                            <h2>Reserva de habitación</h2>
                            <h2>Elija sus fechas</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <InputLabel htmlFor="dni">RUT/DNI</InputLabel>
                                <TextField
                                    name="dni"
                                    value={formik.values.dni}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dni && Boolean(formik.errors.dni)}
                                    helperText={formik.touched.dni && formik.errors.dni}
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextField
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="password">Contraseña</InputLabel>
                                <TextField
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="firstName">Nombre</InputLabel>
                                <TextField
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.firstName && Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="lastName">Apellido</InputLabel>
                                <TextField
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="phone">Teléfono</InputLabel>
                                <TextField
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="nationality">Nacionalidad</InputLabel>
                                <TextField
                                    name="nationality"
                                    value={formik.values.nationality}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.nationality &&
                                        Boolean(formik.errors.nationality)
                                    }
                                    helperText={
                                        formik.touched.nationality && formik.errors.nationality
                                    }
                                />
                                <h1> </h1>
                                <InputLabel htmlFor="birthDate">Fecha de nacimiento</InputLabel>
                                <TextField
                                    name="birthDate"
                                    type="date"
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.birthDate && Boolean(formik.errors.birthDate)
                                    }
                                    helperText={
                                        formik.touched.birthDate && formik.errors.birthDate
                                    }
                                />
                                <h1> </h1>
                                <Button type="submit">Registrar</Button>
                            </form>
                        </div>
                    </div>
                )}
            </body>
        </div>
    );
}
export default ReserveRoom;
