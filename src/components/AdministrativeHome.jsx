import React, {useState} from "react";
import Navbar from "./Navbar";
import ManageClients from "./clients managers/Clients_managers"
import RegisterRoom from "./RegisterRoom/RegisterRoom"

function AdministrativeHome() {
    const [currentView, setCurrentView] = useState(null);

    const showManageClients = () => {
        setCurrentView("manageClients");
    };

    const showRegisterRoom = () => {
        setCurrentView("registerRoom");
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
            onClick: () =>{
                //Logica
            },
        },
    ];

    const renderView = () => {
        switch (currentView) {
          case "manageClients":
            return <ManageClients />;
          case "registerRoom":
            return <RegisterRoom />;
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