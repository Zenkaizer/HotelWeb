import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

function ManageAdministratives() {
  const administratives = [/* Lista de administrativos */];
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Typography className='text' variant="h4" gutterBottom>
        Administrativos
      </Typography>
      <div>
        <TextField
          label="Buscar"
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          Agregar
        </Button>
      </div>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {administratives.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((administrative) => (
                <TableRow key={administrative.id}>
                  <TableCell>{administrative.id}</TableCell>
                  <TableCell>{administrative.name}</TableCell>
                  <TableCell>{administrative.email}</TableCell>
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
    </Container>
  );
}

export default ManageAdministratives;

