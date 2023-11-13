import React from 'react';
import './Login.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from "jwt-decode";
import {loginSchema} from "../../schemas/loginSchema";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingrese un correo válido')
        .required('El correo es obligatorio'),
    password: Yup.string()
        .required('La contraseña es obligatoria'),
});

const Login = () => {
    const navigate = useNavigate();

    const redirectToMain = () => {
        navigate("/");
    }

    const iconStyle = {
        fontSize: 50,
    };

    const handleLogin = (values) => {
        axios.post('http://localhost:9000/auth/login', values)
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    const decodedToken = jwtDecode(token);
                    const userRole = decodedToken.role;

                    toast.success('Inicio de sesión exitoso');

                    if (userRole === 'CLIENT') {
                        navigate("/home");
                    } else if (userRole === 'ADMINISTRATIVE') {
                        navigate("/administrativo");
                    } else if (userRole === 'ADMINISTRATOR') {
                        navigate("/administrador");
                    } else {
                        navigate("/default");
                        console.log(decodedToken);
                    }
                } else {
                    toast.error("Credenciales incorrectas. Inténtalo de nuevo.");
                }
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión:', error);
                toast.error("Credenciales incorrectas. Inténtalo de nuevo");
            });
    };

    return (
        <div className="background">
            <div className="img-flecha">
                <IconButton onClick={redirectToMain}>
                    <ArrowBackIcon style={iconStyle} />
                </IconButton>
            </div>

            <div className="backgroundcomponents">
                <div className="Login">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Correo</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="input"
                                />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="input"
                                />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                            <button type="submit" className="iniciar-sesion">
                                Iniciar sesión
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
