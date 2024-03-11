import { Box, Container, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarFormacion } from "../../hooks/useAgregarFormacion";
import { cargarFormacion } from "../../helpers";
import { DataTableEmpleado } from "../../components";
import { FormacionForm } from "../../components/formsCompletos/FormacionForm";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";

export const FormacionPage = () => {
    const { control, handleSubmit, reset } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({})
    const [Formacion, setFormacion] = useState([])
    const [open, setOpen] = useState(false);
    const mensaje = "Documento agregado correctamente"

    useEffect(() => {
      cargarFormacion(cl,setDatos,setFormacion)
}, [cl]);

const nuevosDatos = Formacion.map(forma =>({ 
  observaciones: forma.observaciones,
  fechaCarga: forma.fechaCarga,
  nombre: forma.empleado.nombre, 
  nombreDoc: forma.nombreArchivo,
}) )

const columns = [
  { name: 'nombre', label: 'Nombre del empleado' },
  { name: 'observaciones', label: 'observaciones' },
  { name: 'fechaCarga', label: 'Fecha de carga' },
  { name: 'nombreDoc', label: 'Nombre archivo' },
  {
    name: 'descargar',
    label: 'Descargar Documento',
    options: {
      customBodyRender: (_, tableMeta) => (
        <a href={`http://localhost:3000/descargar/formacion/${tableMeta.rowData[3]}`} download>
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
      datos.append('archivo', data.nombreArchivo[0])
      datos.append('nombreArchivo', data.nombreArchivo[0].name)
      datos.append('empleadoId', Datos.id)
      datos.append('observaciones', data.observaciones)
      datos.append('fechaCarga', `${data.fechaCarga}T00:00:00.000Z`)
      
      try {
       const response =  await agregarFormacion(datos);

        if(response) {     
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
                    Formación
            </Typography>
        </Box>
        <FormacionForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
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
