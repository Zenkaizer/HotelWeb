import React, { useState, useEffect } from "react";
import "./Clients_managers.css";
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

function Clients_managers() {
    /**agregado por matias*/
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const onSubmit = async (values) => {
        axios
            .post("http://localhost:9000/clients", values)
            .then(async (response) => {
                if (response.status === 200) {
                    toast.success("Cliente agregado correctamente");
                    fetchClients();
                    handleCloseModal();
                } else {
                    toast.error(
                        "Error en el ingreso del cliente. Inténtalo de nuevo."
                    );
                }
            })
            .catch((error) => {
                console.error("Error en el ingreso del cliente:", error);
                toast.error(
                    "Error en el ingreso del cliente. Inténtalo de nuevo."
                );
            });
    };

    const [openModal, setOpenModal] = useState(false);
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:9000/clients");
            setClients(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de clientes:", error);
        }
    };

    useEffect(() => {
        fetchClients();
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
            dni: "",
            email: "",
            password: "Example123",
            firstName: "",
            lastName: "",
            phone: "",
            nationality: "",
            birthDate: "",
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

    return (
        <div>
            <AppBar className="appbar" position="static">
                <Toolbar>
                    <Button color="inherit">Reservar Habitación</Button>
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
                Clientes
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
                                <TableCell>RUT/DNI</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Nacionalidad</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients
                                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                .map((client) => (
                                    <TableRow key={client.dni}>
                                        <TableCell>{client.dni}</TableCell>
                                        <TableCell>{client.firstName}</TableCell>
                                        <TableCell>{client.lastName}</TableCell>
                                        <TableCell>{client.nationality}</TableCell>
                                        <TableCell>{client.phone}</TableCell>
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
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                    Agregar Cliente
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
                            {errors.dni && touched.dni && (
                                <p className="error">{errors.dni}</p>
                            )}
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
                            <input
                                className={
                                    errors.nationality && touched.nationality ? "input-error" : ""
                                }
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={values.nationality}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
export default Clients_managers;