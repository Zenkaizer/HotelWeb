import React, { useState } from 'react';
import './EditProfile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditProfile() {
  const [formData, setFormData] = useState({
    rutOrDni: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    phone: '',
    nationality: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perfil de usuario actualizado:", formData);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  return (
    <div className='background'>
      <div className='div'>
        <form onSubmit={handleSubmit}>
          <div className='div2'>
            <TextField
              label="RUT/DNI"
              variant="outlined"
              type="text"
              id="rutOrDni"
              name="rutOrDni"
              value={formData.rutOrDni}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              id="password"
              name="password"
              pattern='[A-Za-z0-9@$]{8,}'
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Nombre"
              variant="outlined"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Apellido(s)"
              variant="outlined"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Teléfono"
              variant="outlined"
              type="tel"
              id="phone"
              name="phone"
              pattern='[0-9]{9}'
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Nacionalidad"
              variant="outlined"
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className='div2'>
            <TextField
              label="Fecha de nacimiento"
              variant="outlined"
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: getCurrentDate() }}
              fullWidth
            />
          </div>
          <Button className='button' type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
