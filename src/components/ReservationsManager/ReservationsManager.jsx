import React, { useEffect, useState } from "react";
import axios from "axios";
import Clients_managers from "../ClientsManager/ClientsManager";
import Navbar from "../Navbar";

function ReservationsManager() {
    const [reservations, setReservations] = useState([]);

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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            </body>
        </div>
    );
}

export default ReservationsManager;