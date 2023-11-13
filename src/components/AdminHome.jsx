import React, { useState } from "react";
import Navbar from "./Navbar";
import ManageAdministratives from "./ManageAdministratives";

function AdminHome() {
  const [currentView, setCurrentView] = useState(null);

  const showManageAdministratives = () => {
    setCurrentView("manageAdministratives");
  };

  const options = [
    {
      label: "Gestionar Administrativos",
      onClick: showManageAdministratives,
    },
    {
      label: "Gestionar Reservas",
      onClick: () => {
        // Lógica para mostrar la vista de gestión de reservas
      },
    },
    {
      label: "Estadísticas",
      onClick: () => {
        // Lógica para mostrar la vista de estadísticas
      },
    },
  ];

  // Renderiza la vista correspondiente en función del estado "currentView"
  const renderView = () => {
    switch (currentView) {
      case "manageAdministratives":
        return <ManageAdministratives />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar options={options} />
      {renderView()}
    </div>
  );
}

export default AdminHome;
