import React, {useState} from "react";
import Navbar from "./Navbar";
import ManageClients from "./ClientsManager/ClientsManager"
import RegisterRoom from "./RegisterRoom/RegisterRoom"
import ReservationsManager from "./ReservationsManager/ReservationsManager"

function AdministrativeHome() {
    const [currentView, setCurrentView] = useState(null);

    const showManageClients = () => {
        setCurrentView("manageClients");
    };

    const showRegisterRoom = () => {
        setCurrentView("registerRoom");
    };

    const showReservationsManager = () => {
        setCurrentView("reservationsManager");
    };
    const options = [
        {
            label: "Gestionar Clientes",
            onClick: showManageClients,
        },
        {
            label: "Registrar Habitación",
            onClick: showRegisterRoom,
        },
        {
            label: "Gestionar Reservas",
            onClick: showReservationsManager,
        },
    ];

    const renderView = () => {
        switch (currentView) {
          case "manageClients":
            return <ManageClients />;
          case "registerRoom":
            return <RegisterRoom />;
          case "reservationsManager":
            return <ReservationsManager/>;
          default:
            return null;
        }
      };

    return (
        <div>
            <Navbar options={options} />
            {renderView()}
        </div>
    )

}

export default AdministrativeHome;