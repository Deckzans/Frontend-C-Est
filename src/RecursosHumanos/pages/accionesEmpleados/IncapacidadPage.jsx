import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { cargarDatosEmpleadoInca} from "../../helpers";
import {agregarIncapacidad } from "../../hooks/";
import { DataTableEmpleado, IncapacidadForm} from "../../components";
import { useForm } from "react-hook-form"
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";

export const IncapacidadPage = () => {
    const { reset } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({})
    const [open, setOpen] = useState(false);
    const mensaje = "Incapacidad agregada correctamente";
    const [Incapacidades, setIncapacidades] = useState([])

    useEffect(() => {
          cargarDatosEmpleadoInca(cl,setDatos,setIncapacidades)
    }, [cl]);

    const nuevosDatos = Incapacidades.map(incapacidad =>({ 
      incapacidad: incapacidad.observaciones,
      tipo: incapacidad.tipo,
      nombre: incapacidad.empleado.nombre, 
      nombreDoc: incapacidad.nombreImagen,
    }) )

    const columns = [
      { name: 'incapacidad', label: 'incapacidad' },
      { name: 'tipo', label: 'tipo' },
      { name: 'nombre', label: 'Nombre del empleado' },
      { name: 'nombreDoc', label: 'Nombre archivo' },
      {
        name: 'descargar',
        label: 'Descargar Documento',
        options: {
          customBodyRender: (_, tableMeta) => (
            <a href={`http://localhost:3000/descargar/incapacidad/${tableMeta.rowData[3]}`} download>
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
      datos.append('tipo', data.tipo)
      datos.append('diasIncapacitado', parseInt(data.diasIncapacitado))
      datos.append('fechaIncapacidad', `${data.fechaIncapacidad}T00:00:00.000Z`)
      try {
       const response =  await agregarIncapacidad(datos);
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

    const handleReset = () => {
      reset();
    };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box textAlign="center" mt={10}> 
            <Typography  variant="h5" gutterBottom> 
                    Incapacidad 
            </Typography>
        </Box>
        <IncapacidadForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
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
