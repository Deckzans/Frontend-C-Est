//importaciones de react
import { loginStyles } from '../styles/StylesLogin';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { iniciarSesion } from '../helpers/apiEstado';
import useAppState from '../hooks/estado';

//importaciones react form 
import { useForm } from "react-hook-form";

//Importaciones de mui 
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from "@mui/material/Alert";
import Snackbar  from "@mui/material/Snackbar";


export const FormIngresar = () => {
  // const { token, usuario, rol } = useAppState();
  const navigate = useNavigate();
  const { register, handleSubmit,formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const onSubmit = async (data) => {
    try {
     const response =  await iniciarSesion(data.usuario, data.password);
        
      if(response){ 
        console.log(response)
          navigate('/home')
          
        } 
    } catch (error) {
      // Manejar el error aquí, si es necesario
      setOpenError(true);
    }
  };

  const handleRegistro = () => {
    navigate('/registro')
  }

  // console.log(token,usuario,rol)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper variant="elevation" sx={{ ...loginStyles.paper, ...loginStyles.centeredPaper }}>
        <Avatar sx={loginStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Ingresar
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="usuario"
          label="Usuario"
          name="usuario"
          autoComplete="usuario"
          autoFocus
          {...register('usuario', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'El nombre de password debe contener solo letras',
            },
          })}
        />
         {errors.usuario && <span>{errors.usuario.message}</span>}
        <TextField
          margin="normal"
          fullWidth
          type="password"
          id="password"
          label="password"
          name="password"
          autoComplete="password"
          {...register('password', {
            required: 'Este campo es obligatorio',
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Ingresar
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          onClick={handleRegistro}
        >
          Registrarse
        </Button>
        <Grid container spacing={1}>
          <Grid xs={12} md={12}>
            <Button
              onClick={() => setOpen(true)}
              variant="text"
            >
              ¿olvidaste la contraseña ?
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={2500}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity="warning"
                variant="filled"
              >
                Contacta al departamento de sistemas! 
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
                Contraseña o usuario incorrecto
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Paper>
    </form>
  )
}
