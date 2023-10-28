import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import IconButton from "@mui/material/IconButton";
import { useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Register() {

    const navigate = useNavigate();

    const redirectToMain = () => {
        navigate("/");
    }

    const iconStyle = {
        fontSize: 50,
    };


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

  return (
    <div className='background'>
        <div className ='img-flecha'>
            <IconButton onClick={redirectToMain}>
                <ArrowBackIcon style={iconStyle} />
            </IconButton>
        </div>

        <div className='div'>
        <form onSubmit={handleSubmit}>
          <div className="div2">
            <label htmlFor="rutOrDni">RUT/DNI</label>
            <input
              className={errors.rutOrDni && touched.rutOrDni ? "input-error": ""}
              type="text"
              id="rutOrDni"
              name="rutOrDni"
              value={values.rutOrDni}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.rutOrDni && touched.rutOrDni && <p className="error">{errors.rutOrDni}</p>}
          </div>
          <div className="div2">
            <label htmlFor="email">Correo electrónico</label>
            <input
              className={errors.email && touched.email ? "input-error": ""}
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="div2">
            <label htmlFor="password">Contraseña</label>
            <input
              className={errors.password && touched.password ? "input-error": ""}
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="div2">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              className={errors.confirmPassword && touched.confirmPassword ? "input-error": ""}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <div className="div2">
            <label htmlFor="name">Nombre</label>
            <input
              className={errors.name && touched.name ? "input-error": ""}
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="div2">
            <label htmlFor="lastName">Apellido(s)</label>
            <input
              className={errors.lastName && touched.lastName ? "input-error": ""}
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="div2">
            <label htmlFor="phone">Teléfono</label>
            <input
              className={errors.phone && touched.phone ? "input-error": ""}
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="div2">
            <label htmlFor="nationality">Nacionalidad</label>
            <input
              className={errors.nationality && touched.nationality ? "input-error": ""}
              type="text"
              id="nationality"
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nationality && touched.nationality && <p className="error">{errors.nationality}</p>}
          </div>
          <div className="div2">
            <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
            <input
              className={errors.dateOfBirth && touched.dateOfBirth ? "input-error": ""}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dateOfBirth && touched.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          </div>
          <button disabled={isSubmitting} type="submit" className="button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
