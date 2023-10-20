import React, { useState } from 'react';
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
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="RUT/DNI"
          type="text"
          name="rutOrDni"
          value={formData.rutOrDni}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
