import React from 'react';
import Navbar from './Navbar';

function CustomerHome() {
  const mostrarEditarPerfil = () => {
  };

  const opciones = [
    {
      label: 'Reservar habitación',
      onClick: () => {
      },
    },
  ];

  return (
    <div>
      <Navbar opciones={opciones} mostrarEditarPerfil={mostrarEditarPerfil} />
    </div>
  );
}

export default CustomerHome;
