import React, { useEffect, useState } from 'react';
import { DataTableEmpleado } from '../components/DataTableEmpleado';
import { Button, Container, Paper } from '@mui/material';
import { eliminarUsuario, traerUsuarios } from '../hooks/useTraerUsuarios';
import { DeleteForever, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
export const AdministradorPage = () => {

  const [Usuarios, setUsuarios] = useState([])
  const navigate = useNavigate(); 

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await traerUsuarios();
        const { success, data } = response;
        if (success) {
          setUsuarios(data);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };
    cargarUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {

        const response = await eliminarUsuario(id);

        if(response.success){ 
          console.log('borrado exitosamente')
        }
  
    } catch (error) {
      console.error(`Error al intentar usuario el día: ${error.message}`);
    }
  };

  const handleEditarDia = (id) => {
    navigate(`editarUsuario/${id}`)

  }

  const nuevosDatos = Usuarios.map(usuario => ({
    id: usuario.id,
    nombre: usuario.nombre,
    usuario: usuario.usuario,
    rol: usuario.rol,
  }));


  const columns = [
    { name: 'id', label: 'id' },
    { name: 'nombre', label: 'nombre' },
    { name: 'usuario', label: 'usuario' },
    { name: 'rol', label: 'rol' },
    {
      name: "acciones",
      label: "acciones",
      options: {
        customBodyRender: (_, tableMeta) => (
          <>
            <Button endIcon={<Description />} sx={{ mr: 1 }}  size="small" variant="contained" onClick={() => handleEditarDia(tableMeta.rowData[0])}>
              Editar
            </Button>
            <Button endIcon={<DeleteForever />} size="small"  color="error" variant="contained" onClick={() => handleEliminarUsuario(tableMeta.rowData[0], tableMeta.rowData[2])}>
              Eliminar
            </Button>
          </>
        ),
      },
    },
  ];

  // Opciones personalizadas para el DataTableEmpleado
  const customOptions = {
    responsive: 'vertical',
    selectableRows: 'none',
    print:false,
    filter:false,
    download:false,
    pagination: true, // Habilita la paginación
    rowsPerPage: 5, // Número de filas por página
    rowsPerPageOptions: [5, 10, 20] // Opciones para cambiar el número de filas por página
    // Agrega otras opciones personalizadas según sea necesario
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado
          data={nuevosDatos}
          columns={columns}
          title="Usuarios"
          options={customOptions}
        />
      </Paper>
    </Container>
  );
};
