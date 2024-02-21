//Importaciones de mui 
import Avatar  from "@mui/material/Avatar";
import  Button from "@mui/material/Button";
import TextField  from "@mui/material/TextField";
import Typography  from "@mui/material/Typography";
import Paper  from "@mui/material/Paper";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Unstable_Grid2';

//importaciones de react
import { Link } from "react-router-dom";
import { loginStyles } from '../styles/StylesLogin';

export const FormIngresar = () => {
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
      id="usuario"
      label="Usuario"
      name="usuario"
      autoComplete="usuario"
      autoFocus
    />
    <TextField
      margin="normal"
      fullWidth
      id="password"
      label="Contraseña"
      name="password"
      autoComplete="password"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
    >
      Ingresar
    </Button>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 1, mb: 2 }}
    >
      Registrarse
    </Button>
    <Grid container spacing={1}>
      <Grid  xs={12} md={12}>
        <Link href="#" variant="body2">
          ¿Recordar contraseña?
        </Link>
      </Grid>
    </Grid>
  </Paper>
  )
}
