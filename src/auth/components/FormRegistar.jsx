import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Snackbar  from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';
import { set, useForm } from 'react-hook-form';
import { loginStyles } from '../styles/StylesLogin';
import { registarUsuario } from '../helpers/useRegistro';
import { useNavigate } from 'react-router-dom';

export const FormRegistrar = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      await registarUsuario(data);
      setOpen(true); // Mostrar Snackbar de éxito
    } catch (error) {
      if (error.message === 'Usuario duplicado') {
        setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    setOpenError(false);
    navigate('/'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} variant="elevation" sx={{ ...loginStyles.paper, ...loginStyles.centeredPaper }}>
      <Avatar sx={loginStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" component="h1">
        Ingresar
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="nombre"
        label="nombre"
        name="nombre"
        autoComplete="nombre"
        autoFocus
        {...register('nombre', { 
          required: 'Este campo es obligatorio',
          minLength: {
            value: 5,
            message: 'El nombre debe tener al menos 5 caracteres'
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'El nombre solo debe contener letras'
          }
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      <TextField
        margin="normal"
        fullWidth
        id="area"
        label="area"
        name="area"
        autoComplete="area"
        {...register('area', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 5,
            message: 'El área debe tener al menos 5 caracteres'
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'El área solo debe contener letras'
          }
        })}
      />
      {errors.area && <span>{errors.area.message}</span>}
      <TextField
        margin="normal"
        fullWidth
        id="usuario"
        label="usuario"
        name="usuario"
        autoComplete="usuario"
        {...register('usuario', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 5,
            message: 'El usuario debe tener al menos 5 caracteres'
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'El usuario solo debe contener letras'
          }
        })}
      />
      {errors.usuario && <span>{errors.usuario.message}</span>}
      <TextField
        margin="normal"
        fullWidth
        id="rol"
        label="Rol"
        name="rol"
        value="estandar"
        disabled
      />
      {errors.rol && <span>{errors.rol.message}</span>}
      <TextField
        margin="normal"
        fullWidth
        id="password"
        label="contraseña"
        name="password"
        autoComplete="password"
        type="password"
        {...register('password', { required: 'Este campo es obligatorio',   minLength: {
          value: 8,
          message: 'El área debe tener al menos 8 caracteres'
        }, })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
      >
        Registrarse
      </Button>
      <Snackbar
              open={open}
              autoHideDuration={2500}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity="success"
                variant="filled"
              >
                Usuario creado correctamente
              </Alert>
            </Snackbar>
      <Snackbar
              open={openError}
              autoHideDuration={2500}
              onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity="error"
                variant="filled"
              >
                El nombre de usuario ya existe
              </Alert>
            </Snackbar>
    </Paper>
  );
};
