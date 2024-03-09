import { Box, Container, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarFormacion } from "../../hooks/useAgregarFormacion";
import { cargarFormacion } from "../../helpers";
import { DataTableEmpleado } from "../../components";
import { FormacionForm } from "../../components/formsCompletos/FormacionForm";

export const FormacionPage = () => {
    const { control, handleSubmit, reset } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({})
    const [Formacion, setFormacion] = useState([])

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

    const onSubmit = async (data) => {

      const datos = new FormData();
      datos.append('archivo', data.nombreArchivo[0])
      datos.append('nombreArchivo', data.nombreArchivo[0].name)
      datos.append('empleadoId', Datos.id)
      datos.append('observaciones', data.observaciones)
      datos.append('fechaCarga', `${data.fechaCarga}T00:00:00.000Z`)
      
      try {
        await agregarFormacion(datos);
        // setOpen(true); // Mostrar Snackbar de éxito
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
    </Container>
  )
}
