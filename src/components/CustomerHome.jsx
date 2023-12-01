import React, { useState } from 'react';
import Navbar from './Navbar';
import ReserveRoom from "./ReserveRoom/ReserveRoom";
import EditProfile from './EditProfile';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
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
    setShowEditProfile(false);
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
        <Navbar options={options} showEditProfile={showEditProfileHandler} />
        <Dialog open={showEditProfile} onClose={closeModalHandler} fullWidth>
          <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Editar Perfil</Typography>
              <IconButton aria-label="close" onClick={closeModalHandler}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <EditProfile />
          </DialogContent>
        </Dialog>
        {renderView()}
      </div>
  )
}

export default CustomerHome;
