import { useState, useEffect } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { agregarPermiso } from '../../hooks';
import { cargarDatosEmpleado } from '../../helpers';
import { DataTableEmpleado, PermisoForm } from "../../components";
import { useForm } from "react-hook-form";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";


export const PermisoPage = () => {
  const {reset } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({});
  const [Permisos, setPermisos] = useState([]);
  const [open, setOpen] = useState(false);
  const mensaje = "Permiso agregado correctamente";

  useEffect(() => {
    cargarDatosEmpleado(cl, setDatos, setPermisos);
  }, [cl]);

  const nuevosDatos = Permisos.map(permiso => ({
    observaciones: permiso.observaciones,
    nombre: permiso.empleado.nombre,
    nombreDoc: permiso.nombreImagen,
  }));

  const columns = [
    { name: 'observaciones', label: 'Observaciones' },
    { name: 'nombre', label: 'Nombre del empleado' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'descargar',
      label: 'Descargar Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <a href={`http://localhost:3000/descargar/permisos/${tableMeta.rowData[2]}`} download>
            Descargar
          </a>
        ),
      },
    },
  ];

  const customOptions = {
    responsive: 'standard',
    selectableRows: 'none',
  };

  
  const handleSnackbarClose = () => {
    setOpen(false); 
    window.location.reload();
  };


  const onSubmit = async (data) => {
    const datos = new FormData();
    datos.append('archivo', data.nombreImagen[0]);
    datos.append('nombreImagen', data.nombreImagen[0].name);
    datos.append('empleadoId', Datos.id);
    datos.append('observaciones', data.observaciones);
    datos.append('fechaPermiso', `${data.fechaPermiso}T00:00:00.000Z`);
    datos.append('fechaRegreso', `${data.fechaRegreso}T00:00:00.000Z`);

    try {
     const response = await agregarPermiso(datos);
     if(response ) {     
      setOpen(true);
  }
      // setOpen(true); // Mostrar Snackbar de éxito
    } catch (error) {
      if (error.message === 'Error al ingresar empleado') {
        // setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" gutterBottom>
          Permisos
        </Typography>
      </Box>
      <PermisoForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado
          data={nuevosDatos}
          columns={columns}
          title="Mi Tabla"
          options={customOptions}
        />
      </Paper>
      <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={mensaje} />
    </Container>
  );
};


