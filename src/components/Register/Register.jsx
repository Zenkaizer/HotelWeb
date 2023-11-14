import React, { useState } from "react";
import Select from "react-select";
import CountryList from "react-select-country-list";
import "./Register.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas";

const countries = CountryList().getData();

function Register() {
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate("/");
  };

  const onSubmit = async (values) => {
    axios
      .post("http://localhost:9000/auth/register", values)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/home");
          toast.success("Registro exitoso");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        toast.error("Error al registrarse. Inténtalo de nuevo");
      });
  };

  const iconStyle = {
    fontSize: 50,
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      dni: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      birthDate: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <div className="background">
      <div className="img-flecha">
        <IconButton onClick={redirectToMain}>
          <ArrowBackIcon style={iconStyle} />
        </IconButton>
      </div>

      <div className="div">
        <form onSubmit={handleSubmit}>
          <div className="div2">
            <label htmlFor="dni">RUT/DNI</label>
            <input
              className={errors.dni && touched.dni ? "input-error" : ""}
              type="text"
              id="dni"
              name="dni"
              value={values.dni}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dni && touched.dni && <p className="error">{errors.dni}</p>}
          </div>
          <div className="div2">
            <label htmlFor="email">Correo electrónico</label>
            <input
              className={errors.email && touched.email ? "input-error" : ""}
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="password">Contraseña</label>
            <input
              className={
                errors.password && touched.password ? "input-error" : ""
              }
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="firstName">Nombre</label>
            <input
              className={
                errors.firstName && touched.firstName ? "input-error" : ""
              }
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName && (
              <p className="error">{errors.firstName}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="lastName">Apellido(s)</label>
            <input
              className={
                errors.lastName && touched.lastName ? "input-error" : ""
              }
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName && (
              <p className="error">{errors.lastName}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="phone">Teléfono</label>
            <input
              className={errors.phone && touched.phone ? "input-error" : ""}
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone && (
              <p className="error">{errors.phone}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="nationality">Nacionalidad</label>
            <Select
              id="nationality"
              name="nationality"
              value={countries.find(
                (option) => option.value === values.nationality
              )}
              onChange={(selectedOption) =>
                handleChange("nationality")(selectedOption.value)
              }
              onBlur={handleBlur}
              options={countries}
            />
            {errors.nationality && touched.nationality && (
              <p className="error">{errors.nationality}</p>
            )}
          </div>
          <div className="div2">
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              className={
                errors.dateOfBirth && touched.dateOfBirth ? "input-error" : ""
              }
              type="date"
              id="birthDate"
              name="birthDate"
              value={values.birthDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.birthDate && touched.birthDate && (
              <p className="error">{errors.birthDate}</p>
            )}
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
