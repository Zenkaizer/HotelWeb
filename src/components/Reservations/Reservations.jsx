import React, { useState, useEffect } from "react";
import "./Reservations.css";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/index";
import { toast } from "react-toastify";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";

function Reservations() {

    /**agregado por matias*/
        // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onSubmit = async (values) => {
        axios
            .post("http://localhost:9000/reserves", values)
            .then(async (response) => {
                if (response.status === 200) {
                    toast.success("Su habitación fue reservada con éxito");
                    fetch_reserves();
                    handleCloseModal();
                } else {
                    toast.error(
                        "Error en reservar la habitación. Inténtalo de nuevo."
                    );
                }
            })
            .catch((error) => {
                console.error("Error en la reserva:", error);
                toast.error(
                    "Error en reservar la habitación. Inténtalo de nuevo."
                );
            });
    };

    const [openModal, setOpenModal] = useState(false);
    const [reserves, setClients] = useState([]);

    const fetch_reserves = async () => {
        try {
            const response = await axios.get("http://localhost:9000/reserves");
            setClients(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de habitaciones:", error);
        }
    };

    useEffect(() => {
        fetch_reserves();
    }, []);

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

            roomNumber: "",
            userDni: "",
            firstName: "",
            lastName: "",
            arriveDateTime: "",
            leaveDateTime: "",
            price: ""
        },
        validationSchema: registerSchema,
        onSubmit,
    });

    const rowsPerPage = 5;
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return(
        <div>
            <AppBar className="appbar" position="static">
                <Toolbar>
                    <Button color="inherit"></Button>
                    <div style={{ flexGrow: 1 }}></div>
                    <IconButton
                        color="inherit"
                        aria-controls="account-menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem component={Link} to="/edit-profile">
                            Editar perfil
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: "30px" }}>
                <Typography className="text" variant="h4" gutterBottom>
                    Listado de reservas
                </Typography>
                <div style={{ marginBottom: "1ch" }}>
                    <TextField label="Buscar" variant="outlined" />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "1ch", padding: "2ch" }}
                        onClick={handleOpenModal}
                    >
                        Agregar
                    </Button>
                </div>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Habitación</TableCell>
                                    <TableCell>ID Cliente</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Inicio</TableCell>
                                    <TableCell>Término</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reserves
                                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                    .map((reserve) => (
                                        <TableRow key={reserve}>
                                            <TableCell>{reserve.roomNumber}</TableCell>
                                            <TableCell>{reserve.userDni}</TableCell>
                                            <TableCell>{reserve.firstName}</TableCell>
                                            <TableCell>{reserve.lastName}</TableCell>
                                            <TableCell>{reserve.arriveDateTime}</TableCell>
                                            <TableCell>{reserve.leaveDateTime}</TableCell>
                                            <TableCell>{reserve.price}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary">
                                                    Editar
                                                </Button>
                                                <Button variant="contained" color="secondary">
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <TablePagination
                    rowsPerPageOptions={[rowsPerPage]}
                    component="div"
                    count={reserves.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>
                        Añadir Reserva
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseModal}
                            aria-label="close"
                            style={{ position: "absolute", top: "10px", right: "15px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <div className="div2">
                                <label htmlFor="roomNumber">ID Habitación</label>
                                <input
                                    className={errors.roomNumber && touched.roomNumber ? "input-error" : ""}
                                    type="text"
                                    id="roomNumber"
                                    name="roomNumber"
                                    value={values.roomNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.roomNumber && touched.roomNumber && (
                                    <p className="error">{errors.roomNumber}</p>
                                )}
                            </div>
                            <div className="div2">
                                <label htmlFor="userDni">ID Cliente</label>
                                <input
                                    className={errors.userDni && touched.userDni ? "input-error" : ""}
                                    type="text"
                                    id="userDni"
                                    name="userDni"
                                    value={values.userDni}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.userDni && touched.userDni && (
                                    <p className="error">{errors.userDni}</p>
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
                                <label htmlFor="lastName">Apellido</label>
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
                                <label htmlFor="arriveDateTime">Inicio</label>
                                <input
                                    className={errors.arriveDateTime && touched.arriveDateTime ? "input-error" : ""}
                                    type="text"
                                    id="arriveDateTime"
                                    name="arriveDateTime"
                                    value={values.arriveDateTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.arriveDateTime && touched.arriveDateTime && (
                                    <p className="error">{errors.arriveDateTime}</p>
                                )}
                            </div>
                            <div className="div2">
                                <label htmlFor="leaveDateTime">Final</label>
                                <input
                                    className={errors.leaveDateTime && touched.leaveDateTime ? "input-error" : ""}
                                    type="text"
                                    id="leaveDateTime"
                                    name="leaveDateTime"
                                    value={values.leaveDateTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.leaveDateTime && touched.leaveDateTime && (
                                    <p className="error">{errors.leaveDateTime}</p>
                                )}
                            </div>
                            <div className="div2">
                                <label htmlFor="price">Precio</label>
                                <input
                                    className={errors.price && touched.price ? "input-error" : ""}
                                    type="text"
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
                        </form>
                        <button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            type="submit"
                            className="button"
                        >
                            Agregar
                        </button>
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
}

export default Reservations;