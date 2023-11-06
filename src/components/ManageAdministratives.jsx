import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
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
import { registerSchema } from "../../schemas";

const onSubmit = async(values) => {
  
}

function ManageAdministratives() {
  const [openModal, setOpenModal] = useState(false);
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      rutOrDni: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      phone: "",
      nationality: "",
      dateOfBirth: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });
  const administratives = [
    /* Lista de administrativos */
  ];
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

  const handleAddAdministrative = () => {
    // Agrega el nuevo administrativo a la lista
    handleCloseModal();
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <Typography className="text" variant="h4" gutterBottom>
        Administrativos
      </Typography>
      <div style={{ marginBottom: "1ch" }}>
        <TextField label="Buscar" variant="outlined" />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "1ch" }}
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
                <TableCell>Teléfono</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {administratives
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((administrative) => (
                  <TableRow key={administrative.rutOrDni}>
                    <TableCell>{administrative.rutOrDni}</TableCell>
                    <TableCell>{administrative.name}</TableCell>
                    <TableCell>{administrative.lastName}</TableCell>
                    <TableCell>{administrative.phone}</TableCell>
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
        count={administratives.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          Agregar Administrativo
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
            <TextField
              label="RUT/DNI"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nombre/s"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellido/s"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nacionalidad"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddAdministrative()}
          >
            Agregar
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ManageAdministratives;
