import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ opciones, mostrarEditarPerfil }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {opciones.map((opcion, index) => (
            <IconButton key={index} color="inherit" onClick={opcion.onClick}>
              {opcion.label}
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
            {mostrarEditarPerfil && (
              <MenuItem onClick={mostrarEditarPerfil}>Editar perfil</MenuItem>
            )}
            <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
