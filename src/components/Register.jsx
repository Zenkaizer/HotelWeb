import React, { useState } from 'react';
import './Register.css';

function Register() {
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

  /**
   * Makes the validations for submitting the information
   * @param {rutOrDni, email, password, name, lastName, phone, nationality, dateOfBirth}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    if (ageDifference < 18) {
      alert("Debes ser mayor de 18 años para registrarte.");
    }else{
        console.log(formData);
    }

  };

  /**
   * Function calculates the date.
   * @returns the actual date.
   */
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
          <label htmlFor='rutOrDni'>RUT/DNI</label>
          <input
            className='input'
            type="text"
            id="rutOrDni"
            name="rutOrDni"
            value={formData.rutOrDni}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="email">Correo electrónico</label>
          <input
            className='input'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="password">Contraseña</label>
          <input
            className='input'
            type="password"
            id="password"
            name="password"
            pattern='[A-Za-z0-9@$]{8,}'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="name">Nombre</label>
          <input
            className='input'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="lastName">Apellido(s)</label>
          <input
            className='input'
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="phone">Teléfono</label>
          <input
            className='input'
            type='tel'
            pattern='[0-9]{9}'
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="nationality">Nacionalidad</label>
          <input
            className='input'
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>
        <div className='div2'>
          <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
          <input
            className='input'
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            max={getCurrentDate()}
          />
        </div>
        <button type="submit" className='button'>Registrarse</button>
      </form>
      </div>
    </div>
  );
}

export default Register;