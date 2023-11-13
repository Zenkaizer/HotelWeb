import * as Yup from "yup";


export const registerRoomSchema = Yup.object().shape({
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
});