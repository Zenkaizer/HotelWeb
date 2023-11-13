import * as Yup from "yup";


export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingrese un correo válido.')
        .required('El correo es obligatorio.'),
    password: Yup.string()
        .required('La contraseña es obligatoria.'),
});