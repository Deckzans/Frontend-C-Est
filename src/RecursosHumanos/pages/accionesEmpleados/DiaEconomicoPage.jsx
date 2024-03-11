import { Alert, Box, Button, Container, Grid, Paper, Snackbar, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarDia } from "../../hooks/useAgregarDia";
import { cargarDatosDia } from "../../helpers";
import { DataTableEmpleado, DiaForm } from "../../components";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";


export const DiaEconomicoPage = () => {
  const { cl } = useParams();
  const [Datos, setDatos] = useState({})
  const [DiaEconomico, setDiaEconomico] = useState([])
  const [open, setOpen] = useState(false);
  const mensaje = "Dia agregado correctamente";
  
  useEffect(() => {
    cargarDatosDia(cl, setDatos, setDiaEconomico)
  }, [cl]);

  const nuevosDatos = DiaEconomico.map(dia => ({
    observaciones: dia.observaciones,
    diasTotales: dia.diasTotales,
    fechaDiasRestantes: dia.fechaDiasRestantes,
    nombre: dia.empleado.nombre,
    nombreDoc: dia.nombreImagen,
  }))

  const columns = [
    { name: 'nombre', label: 'Nombre del empleado' },
    { name: 'observaciones', label: 'observaciones' },
    { name: 'diasTotales', label: 'dias Totales' },
    { name: 'fechaDiasRestantes', label: 'Dias Restantes' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'descargar',
      label: 'Descargar Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <a href={`http://localhost:3000/descargar/dia/${tableMeta.rowData[4]}`} download>
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
    datos.append('archivo', data.nombreImagen[0])
    datos.append('nombreImagen', data.nombreImagen[0].name)
    datos.append('empleadoId', Datos.id)
    datos.append('observaciones', data.observaciones)
    datos.append('fechaDiasRestantes', parseInt(data.fechaDiasRestantes))
    datos.append('diasTotales', parseInt(data.diasTotales))
    datos.append('fechaDias', `${data.fechaDias}T00:00:00.000Z`)
    try {
      const response = await agregarDia(datos);

      if(response ) {     
            setOpen(true);
        }
    } catch (error) {
      if (error.message === 'Error al ingresar empleado') {
        // setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" gutterBottom>
          Día economico
        </Typography>
      </Box>
      <DiaForm onSubmit={onSubmit} Datos={Datos} />
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
  )
}
