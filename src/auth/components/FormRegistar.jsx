import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginStyles } from '../styles/StylesLogin';

export const FormRegistrar = () => {
  return (
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
      id="nombre"
      label="nombre"
      name="nombre"
      autoComplete="nombre"
      autoFocus
    />
    <TextField
      margin="normal"
      fullWidth
      id="area"
      label="area"
      name="area"
      autoComplete="area"
    />
      <TextField
        margin="normal"
        fullWidth
        id="usuario"
        label="usuario"
        name="usuario"
        autoComplete="usuario"
      />
    <TextField
      margin="normal"
      fullWidth
      id="password"
      label="contraseña"
      name="password"
      autoComplete="password"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
    >
      Registrarse
    </Button>
  </Paper>
  )
}
