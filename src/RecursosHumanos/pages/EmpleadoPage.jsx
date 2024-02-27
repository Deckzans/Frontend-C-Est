// components/EmpleadoPage.js
import React, { useEffect } from 'react';
import { useEmpleadoStore } from '../hooks/useEmpleadoStore';
import MUIDataTable from 'mui-datatables';
import { Container, Typography, Paper } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useAppState from '../../auth/hooks/estado';

export const EmpleadoPage = () => {
  const { datos, traerEmpleados } = useEmpleadoStore();

  const handleDelete = (selectedRows) => {
    console.log("Eliminar lógica aquí", selectedRows);
  };

  const handleEdit = (selectedRows) => {
    console.log("Editar lógica aquí", selectedRows);
  };

  useEffect(() => {
    traerEmpleados();
  }, [traerEmpleados]);

  const datosFiltrados = datos.map(empleado => ({
    nombre: empleado.nombre,
    apmaterno: empleado.aMaterno,
    appaterno: empleado.aPaterno,
    area: empleado.area.descripcion,
    cargo: empleado.cargo,
    regimenlab: empleado.regimen,
    fechaingreso: new Date(empleado.fechaIngreso).toLocaleDateString(),
    status: empleado.status,
  }));

  const options = {
    filterType: 'checkbox',
    filter: false,
    print: false,
    responsive: "standard",
    elevation: 4,
    selectableRows: "single",
    selectableRowsOnClick: true,
    rowsPerPage: 10,
    download: true,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <EditIcon
          onClick={() => handleEdit(selectedRows)}
          style={{ cursor: "pointer", marginRight: "10px", color: "black" }}
        />
        <DeleteIcon
          onClick={() => handleDelete(selectedRows)}
          style={{ cursor: "pointer", marginRight: "20px", color: "red" }}
        />
      </div>
    ),
  };

  const columns = [
    { name: "nombre", label: "Nombre" },
    { name: "apmaterno", label: "Apellido Materno" },
    { name: "appaterno", label: "Apellido Paterno" },
    { name: "area", label: "Area" },
    { name: "cargo", label: "Cargo" },
    { name: "regimenlab", label: "Regimen Laboral" },
    { name: "fechaingreso", label: "Fecha de ingreso" },
    { name: "status", label: "Status" }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 5 }}>
        Lista de Empleados
      </Typography>
      <Paper sx={{ overflowX: 'auto', mt: 3, marginBottom: '60px' }}>
        <MUIDataTable
          title={"Lista de Empleados"}
          data={datosFiltrados}
          columns={columns}
          options={options}
        />
      </Paper>
    </Container>
  );
};
