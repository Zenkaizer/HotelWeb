import React, { useState, useEffect } from "react";
import "./Bedrooms.css";
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

function Bedrooms() {

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
            .post("http://localhost:9000/rooms", values)
            .then(async (response) => {
                if (response.status === 200) {
                    toast.success("Habitación agregada correctamente");
                    fetchRooms();
                    handleCloseModal();
                } else {
                    toast.error(
                        "Error en el ingreso de la habitación. Inténtalo de nuevo."
                    );
                }
            })
            .catch((error) => {
                console.error("Error en el ingreso de la habitación:", error);
                toast.error(
                    "Error en el ingreso de la habitación. Inténtalo de nuevo."
                );
            });
    };

    const [openModal, setOpenModal] = useState(false);
    const [rooms, setClients] = useState([]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:9000/rooms");
            setClients(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de habitaciones:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
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

            id: "",
            individualBeds: "",
            dualBeds: "Example123",
            haveBathroom: "",
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
                    Habitaciones
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
                                    <TableCell>Camas ind</TableCell>
                                    <TableCell>Camas dobles</TableCell>
                                    <TableCell>Baño</TableCell>
                                    <TableCell>Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rooms
                                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                    .map((room) => (
                                        <TableRow key={room.id}>
                                            <TableCell>{room.individualBeds}</TableCell>
                                            <TableCell>{room.dualBeds}</TableCell>
                                            <TableCell>{room.haveBathroom}</TableCell>
                                            <TableCell>{room.price}</TableCell>
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
                    count={rooms.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>
                        Agregar Habitación
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
                                <label htmlFor="id">ID</label>
                                <input
                                    className={errors.id && touched.id ? "input-error" : ""}
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.id && touched.id && (
                                    <p className="error">{errors.id}</p>
                                )}
                            </div>
                            <div className="div2">
                                <label htmlFor="individualBeds">Camas indiv</label>
                                <input
                                    className={errors.individualBeds && touched.individualBeds ? "input-error" : ""}
                                    type="text"
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
                                <label htmlFor="dualBeds">Camas dobles</label>
                                <input
                                    className={
                                        errors.dualBeds && touched.dualBeds ? "input-error" : ""
                                    }
                                    type="text"
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
                                <label htmlFor="haveBathroom">Baño</label>
                                <input
                                    className={
                                        errors.haveBathroom && touched.haveBathroom ? "input-error" : ""
                                    }
                                    type="text"
                                    id="haveBathroom"
                                    name="haveBathroom"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.haveBathroom && touched.haveBathroom && (
                                    <p className="error">{errors.haveBathroom}</p>
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

export default Bedrooms;