// EmpleadoPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useEmpleadoStore } from '../hooks/useEmpleadoStore';
import { Container, Typography, Paper, Box } from '@mui/material';
import EmpleadoButtons from '../components/EmpleadoButtons';
import EmpleadoTable from '../components/EmpleadoTable';
import { useNavigate } from 'react-router-dom';

export const EmpleadoPage = () => {
  const { datos, traerEmpleados } = useEmpleadoStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const paperRef = useRef(null);

  const handleAdd = () => {
    navigate(`/home/agregar`)

  };
  
  const handleEdit = () => {
    const idSeleccionado = datosFiltrados[selectedRows[0]].id;
    navigate(`/home/editar/${idSeleccionado}`)
  };

  const handleDelete = () => {
    console.log('Eliminar lógica aquí', selectedRows);
  };


  const clearSelection = () => {
    setSelectedRows([]);
  };

  useEffect(() => {
    traerEmpleados();
  }, [traerEmpleados]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paperRef.current && !paperRef.current.contains(event.target)) {
        clearSelection();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const datosFiltrados = datos.map(empleado => ({
    id: empleado.id,
    nombre: empleado.nombre,
    apmaterno: empleado.aMaterno,
    appaterno: empleado.aPaterno,
    area: empleado.area ? empleado.area.descripcion : 'Sin área asignada',
    cargo: empleado.cargo,
    regimenlab: empleado.regimen,
    fechaingreso: new Date(empleado.fechaIngreso).toLocaleDateString(),
    status: empleado.status,
  }));

  return (
    <Container maxWidth="lg">
      <Paper ref={paperRef} sx={{  mt: 3, marginBottom: '60px', boxShadow: 10 }}>
        <EmpleadoButtons
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditDisabled={selectedRows.length !== 1}
          isDeleteDisabled={selectedRows.length === 0}
          isVacacionesDisabled={selectedRows.length === 0}
          isPermisoDisabled={selectedRows.length === 0}
          isIncapacidadDisabled={selectedRows.length === 0}
          isDiaEconomicoDisabled={selectedRows.length === 0}
        />
        {selectedRows.length > 0 && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle1">
              Empleado Seleccionado: {datosFiltrados[selectedRows[0]].nombre} {datosFiltrados[selectedRows[0]].appaterno} {datosFiltrados[selectedRows[0]].apmaterno} 
            </Typography>
          </Box>
        )}
        <EmpleadoTable
          data={datosFiltrados}
          onRowSelectionChange={(currentRowsSelected, allRowsSelected) => {
            setSelectedRows(allRowsSelected.map(row => row.dataIndex));
            console.log('Datos de la fila seleccionada:', datosFiltrados[allRowsSelected[0].dataIndex]);
          }}
          selectedRows={selectedRows}
        />
      </Paper>
    </Container>
  );
};
