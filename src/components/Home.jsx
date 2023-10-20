import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar className="appbar" position="static">
        <Toolbar>
          <Button color="inherit">Reservar Habitación</Button>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            color="inherit"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/edit-profile">
              Editar perfil
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="content">
        <h1>Bienvenido a la Página de Inicio</h1>
        <p>Este es un esqueleto básico de una página de inicio.</p>
      </div>
    </div>
  );
}

export default Home;