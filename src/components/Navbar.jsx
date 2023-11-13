import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

function Navbar({ options, showEditProfile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('token');
    handleMenuClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {options.map((option, index) => (
            <IconButton key={index} color="inherit" onClick={option.onClick}>
              {option.label}
            </IconButton>
          ))}
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="inherit" aria-controls="user-menu" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {showEditProfile && (
              <MenuItem onClick={showEditProfile}>Editar perfil</MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
