import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button>Reservar habitación</button>
      </div>
      <div className="navbar-right">
        <IconButton
          color="primary"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <button>Editar perfil</button>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <button>Cerrar sesión</button>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
