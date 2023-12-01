import React, { useState } from 'react';
import Navbar from './Navbar';
import ReserveRoom from "./ReserveRoom/ReserveRoom";
function CustomerHome() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentView, setCurrentView] = useState(null);

  const showEditProfileHandler = () => {
    setShowEditProfile(true);
  };

  const closeModalHandler = () => {
    setShowEditProfile(false);
  };

  const showReserveRoom = () => {
    setCurrentView("reserveRoom");
  };

  const options = [
    {
      label: 'Reservar habitación',
      onClick: showReserveRoom,
    },
  ];

  const renderView = () => {
    switch (currentView) {
      case "reserveRoom":
        return <ReserveRoom/>;
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

export default CustomerHome;
