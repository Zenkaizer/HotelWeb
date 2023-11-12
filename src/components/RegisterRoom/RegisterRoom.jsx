import React, { useState } from "react";
import "./RegisterRoom.css";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const onSubmit = async (values) => {
    axios
        .post("http://localhost:9000/rooms", values)
        .then((response) => {
            console.log("Registro de habitación exitoso:", response.data);
        })
        .catch((error) => {
            console.error("Error en el registro de habitación:", error);
        });
};

function RegisterRoom() {
    const navigate = useNavigate();

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
            maxCapacity: "",
            individualBeds: "",
            dualBeds: "",
            haveBathroom: false,
            price: "",
        },
        validationSchema: Yup.object().shape({
            maxCapacity: Yup.number()
                .required("La capacidad máxima es obligatoria")
                .integer("La capacidad máxima debe ser un número entero")
                .min(1, "La capacidad máxima debe ser al menos 1"),
            individualBeds: Yup.number()
                .required("La cantidad de camas individuales es obligatoria")
                .integer("La cantidad de camas individuales debe ser un número entero")
                .min(0, "La cantidad de camas individuales no puede ser negativa"),
            dualBeds: Yup.number()
                .required("La cantidad de camas dobles es obligatoria")
                .integer("La cantidad de camas dobles debe ser un número entero")
                .min(0, "La cantidad de camas dobles no puede ser negativa"),
            haveBathroom: Yup.boolean().required("Debes especificar si tiene baño"),
            price: Yup.number()
                .required("El precio por noche es obligatorio")
                .integer("El precio por noche debe ser un número entero")
                .min(0, "El precio por noche no puede ser negativo"),
        }),
        onSubmit,
    });

    return (
        <div className="background-room">
            <div className="div-room">
                <form onSubmit={handleSubmit}>
                    <div className="div2">
                        <label htmlFor="maxCapacity">Capacidad máxima de personas</label>
                        <input
                            className={errors.maxCapacity && touched.maxCapacity ? "input-error" : ""}
                            type="number"
                            id="maxCapacity"
                            name="maxCapacity"
                            value={values.maxCapacity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.maxCapacity && touched.maxCapacity && (
                            <p className="error">{errors.maxCapacity}</p>
                        )}
                    </div>
                    <div className="div2">
                        <label htmlFor="individualBeds">Cantidad de camas individuales</label>
                        <input
                            className={errors.individualBeds && touched.individualBeds ? "input-error" : ""}
                            type="number"
                            id="individualBeds"
                            name="individualBeds"
                            value={values.individualBeds}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.individualBeds && touched.individualBeds && (
                            <p className="error">{errors.individualBeds}</p>
                        )}
                    </div>
                    <div className="div2">
                        <label htmlFor="dualBeds">Cantidad de camas dobles</label>
                        <input
                            className={errors.dualBeds && touched.dualBeds ? "input-error" : ""}
                            type="number"
                            id="dualBeds"
                            name="dualBeds"
                            value={values.dualBeds}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.dualBeds && touched.dualBeds && (
                            <p className="error">{errors.dualBeds}</p>
                        )}
                    </div>
                    <div className="div2">
                        <label htmlFor="haveBathroom">Baño privado</label>
                        <select
                            className={errors.haveBathroom && touched.haveBathroom ? "input-error" : ""}
                            id="haveBathroom"
                            name="haveBathroom"
                            value={values.haveBathroom}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="div2">
                        <label htmlFor="price">Precio por noche</label>
                        <input
                            className={errors.price && touched.price ? "input-error" : ""}
                            type="number"
                            id="price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.price && touched.price && (
                            <p className="error">{errors.price}</p>
                        )}
                    </div>
                    <button disabled={isSubmitting} type="submit" className="button">
                        Registrar Habitación
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterRoom;
