import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { InputField } from "../../components/formularios/InpuetField";
import { DateField } from "../../components/formularios/DateField";
import { commonValidationRules } from "../../helpers/rules";
import { FileField } from "../../components/formularios/FileField";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { traerEmpleado } from "../../hooks/useEmpleadoEditar";
import { agregarVacaciones } from "../../hooks/useAgregarVacaciones";
import { DataTableEmpleado } from "../../components/DataTableEmpleado";
import { traerVacaciones } from "../../hooks/traerVacaciones";


export const VacacionesPage = () => {
  const { control, handleSubmit, reset } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({})
  const [Vacaciones, setVacaciones] = useState([]);

  useEffect(() => {
    const cargarDatosEmpleado = async () => {
      try {
        const response = await traerEmpleado(cl);
        const { success, mensaje, data } = response;
        if (success) {
          setDatos(data);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };
    cargarDatosEmpleado();
  }, [cl]);

  useEffect(() => {
    const cargarVacaciones = async () => {
      try {
        const response = await traerVacaciones(cl);
        const { success, mensaje, data } = response;
        if (success && data) {
          setVacaciones(data); // Si data es directamente el array de vacaciones
        } else {
          setVacaciones([]);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };
    cargarVacaciones();
  }, [cl]);


  const nuevosDatos = Vacaciones.map(vacacion => ({
    año: vacacion.year,
    nombre: vacacion.empleado.nombre, 
    archivo: vacacion.nombreImagen, 
  }));



  const columns = [
    { name: 'año', label: 'Año de vacaciones' },
    { name: 'nombre', label: 'nombre del empleado' },
    { name: 'archivo', label: 'nombre archivo' },
    {
      name: 'descargar',
      label: 'Descargar Documento',
      options: {
        customBodyRender: (value, tableMeta) => (
          <a href={`http://localhost:3000/descargar/vacaciones/${tableMeta.rowData[2]}`} download>
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
    datos.append('archivo', data.imagenEmpleado[0])
    datos.append('nombreImagen', data.imagenEmpleado[0].name)
    datos.append('empleadoId', Datos.id)
    datos.append('periodo', data.periodo)
    datos.append('year', data.year)
    datos.append('fechaInicio', `${data.fechaInicio}T00:00:00.000Z`)
    datos.append('fechaTermino', `${data.fechaTermino}T00:00:00.000Z`)
    datos.append('integracion', `${data.integracion}T00:00:00.000Z`)
    // console.log(datos)
    // const formDataObject = Object.fromEntries(formData.entries());
    // console.log(formDataObject);
    try {
      await agregarVacaciones(datos);
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
        <Typography variant="h5" gutterBottom>
          Vacaciones
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} sx={{ marginBottom: 4 }} >
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <InputField name="periodo" label="periodo" rules={commonValidationRules} control={control} />
          <InputField name="year" label="Año" rules={commonValidationRules} control={control} />
          <InputField name="empleadoId " disabled={true} label={Datos.nombre} control={control} />
          <DateField name="fechaInicio" label="Fecha de Inicio" control={control} rules={{ required: 'este campo es requerido', }} />
          <DateField name="fechaTermino" label="Fecha de termino" control={control} rules={{ required: 'este campo es requerido', }} />
          <DateField name="integracion" label="Fecha de integracion" control={control} rules={{ required: 'este campo es requerido', }} />
          <FileField name="imagenEmpleado" inf="Recuerda añadir solo PDF" label="Subir archvio" rules={{
            required: 'Este campo es requerido',
            validate: {
              customValidation: value => {
                const archivoSeleccionado = value[0];

                if (!archivoSeleccionado) {
                  return 'Por favor, selecciona un archivo.';
                }

                const extensionArchivo = archivoSeleccionado.name.split(".").pop().toLowerCase();

                // Validar la extensión del archivo
                if (extensionArchivo !== 'pdf') {
                  return 'Formato de archivo no válido. Solo se permite formato PDF.';
                }

                return true; // La validación es exitosa
              },
            },
          }} control={control} />
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            Enviar
          </Button>
          <Button type="button" onClick={handleReset} sx={{ mr: 2 }} variant="contained" color="secondary">
            Resetear
          </Button>
          <Link to="/home">
            <Button type="button" variant="contained" color="secondary">
              Regresar
            </Button>
          </Link>
        </Box>
      </form>
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
