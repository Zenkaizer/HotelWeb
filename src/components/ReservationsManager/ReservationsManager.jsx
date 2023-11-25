import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "./ReservationsManager.css";

function ReservationsManager() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    useEffect(() => {
        axios
            .get("http://localhost:9000/reserves")
            .then((response) => {
                setReservations(response.data);
            })
            .catch((error) => {
                console.error("Error consiguiendo reservas:", error);
            });
    }, []);

    const handleEdit = (reservationId) => {
        const selected = reservations.find((reservation) => reservation.id === reservationId);
        setSelectedReservation(selected);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedReservation(null);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `http://localhost:9000/reserves/${selectedReservation.id}`,
                selectedReservation
            );
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    reservation.id === selectedReservation.id ? selectedReservation : reservation
                )
            );
            handleEditModalClose();
        } catch (error) {
            console.error("Error al actualizar la reserva:", error);
        }
    };


    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:9000/reserves/${reservationId}`);
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== reservationId)
            );
            setSelectedReservation(null);
            console.log(`Eliminar reserva con ID: ${reservationId}`);
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
        }
    };

    const options = [
        {
            label: "Gestionar Clientes",
        },
        {
            label: "Registrar Habitación",
        },
        {
            label: "Gestionar Reservas",
            onClick: () =>{
                //Logica
            },
        },
    ];

    return (
        <div>
            <Navbar options={options} />
            <body>
            <h1 className="titulo_listado">Listado de reservas</h1>
            <section className="mt-8">
                <table className="table1">
                    <thead>
                    <tr>
                        <th className="text-gray-600">ID Habitación</th>
                        <th className="text-gray-600">RUT/DNI Cliente</th>
                        <th className="text-gray-600">Nombre Cliente</th>
                        <th className="text-gray-600">Apellido Cliente</th>
                        <th className="text-gray-600">Fecha Reserva</th>
                        <th className="text-gray-600">Fecha Llegada</th>
                        <th className="text-gray-600">Fecha Salida</th>
                        <th className="text-gray-600">Confirmada</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td className="text-gray-600 pr-4">{reservation.room.id}</td>
                            <td className="text-gray-600 pr-4">{reservation.user.dni}</td>
                            <td className="text-gray-600 pr-4">{reservation.user.name}</td>
                            <td className="text-gray-600 pr-4">{reservation.user.lastName}</td>
                            <td className="text-gray-600 pr-4">{reservation.reserve_date_time}</td>
                            <td className="text-gray-600 pr-4">{reservation.arrive_date_time}</td>
                            <td className="text-gray-600 pr-4">{reservation.leave_date_time}</td>
                            <td className="text-gray-600 pr-4">{reservation.confirmed ? "Sí" : "No"}</td>
                            <td className="text-gray-600 pr-4">
                                <button onClick={() => handleEdit(reservation.id)}>Editar</button>
                                <button onClick={() => handleDelete(reservation.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            {isEditModalOpen && selectedReservation && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                            <span className="edit-modal-close" onClick={handleEditModalClose}>
                                &times;
                            </span>
                        <h2>Editar Reserva</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label htmlFor="reserveDateTime">Fecha Reserva:</label>
                            <input
                                type="datetime-local"
                                id="reserveDateTime"
                                name="reserveDateTime"
                                value={selectedReservation.reserve_date_time}
                                onChange={(e) =>
                                    setSelectedReservation({
                                        ...selectedReservation,
                                        reserve_date_time: e.target.value,
                                    })
                                }
                                required
                            />
                            <label htmlFor="arriveDateTime">Fecha Llegada:</label>
                            <input
                                type="datetime-local"
                                id="arriveDateTime"
                                name="arriveDateTime"
                                value={selectedReservation.arrive_date_time}
                                onChange={(e) =>
                                    setSelectedReservation({
                                        ...selectedReservation,
                                        arrive_date_time: e.target.value,
                                    })
                                }
                                required
                            />
                            <label htmlFor="leaveDateTime">Fecha Salida:</label>
                            <input
                                type="datetime-local"
                                id="leaveDateTime"
                                name="leaveDateTime"
                                value={selectedReservation.leave_date_time}
                                onChange={(e) =>
                                    setSelectedReservation({
                                        ...selectedReservation,
                                        leave_date_time: e.target.value,
                                    })
                                }
                                required
                            />
                            <label htmlFor="confirmed">Confirmada:</label>
                            <select
                                id="confirmed"
                                name="confirmed"
                                value={selectedReservation.confirmed}
                                onChange={(e) =>
                                    setSelectedReservation({
                                        ...selectedReservation,
                                        confirmed: e.target.value === "true",
                                    })
                                }
                                required
                            >
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                            <button type="submit">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            )}
            </body>
        </div>
    );
}

export default ReservationsManager;