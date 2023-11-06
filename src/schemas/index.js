import { Schedule, Schema } from "@mui/icons-material";
import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const phoneRules = /^[0-9]{9}$/;

export const registerSchema = yup.object().shape({
  dni: yup.string().required("El RUT o DNI es obligatorio"),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(8)
    .required("La contraseña es obligatoria")
    .matches(passwordRules, {
      message:
        "La contraseña debe contener 1 número, 1 carácter especial, mayúsculas y minúsculas",
    }),
  firstName: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  phone: yup
    .string()
    .matches(phoneRules, {
      message: "Debe ingresar un número de teléfono válido",
    })
    .required("El número de teléfono es obligatorio"),
  nationality: yup.string().required("La nacionalidad es obligatoria"),
  birthDate: yup
    .date()
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
    .test("is-18-or-older", "Debes ser mayor de 18 años", function(value) {
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
        return value <= cutoffDate;
      }),
});