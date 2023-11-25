import * as Yup from "yup";

export const reserveSchema = Yup.object().shape({
    user: Yup.object()
        .required("El usuario es obligatorio"),

    room: Yup.object()
        .required("La habitación es obligatoria"),

    reserveDateTime: Yup.date().required("La fecha y hora de reserva es obligatoria"),

    arriveDateTime: Yup.date().required("La fecha y hora de llegada es obligatoria"),

    leaveDateTime: Yup.date().required("La fecha y hora de salida es obligatoria"),

    confirmed: Yup.boolean().required("La confirmación es obligatoria"),
});