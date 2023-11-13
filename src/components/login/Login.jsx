import React from "react";
import "./Login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate("/");
  };

  const iconStyle = {
    fontSize: 50,
  };

  const handleLogin = (values) => {
    console.log(values);
    axios
      .post("http://localhost:9000/auth/login", values)
      .then(async (response) => {
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          
          navigate("/home")
          toast.success("Inicio de sesión exitoso");
        } else {
          toast.error("Credenciales incorrectas. Inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
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
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Correo</label>
                                <Field type="email" name="email" className="input" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <Field type="password" name="password" className="input" />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error"
                                />
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
