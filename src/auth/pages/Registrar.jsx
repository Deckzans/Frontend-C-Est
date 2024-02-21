import Container  from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { loginStyles } from '../styles/StylesLogin'
import { FormRegistrar,ImgIngresar} from "../components";


export const Regristar = () => {
  return (
    <Container component="main" maxWidth="md" sx={loginStyles.container}>

      <Grid container spacing={2} >
        <Grid  xs={12} md={6}>
          <FormRegistrar />
        </Grid>

        <Grid xs={12} md={6}   >
         <ImgIngresar/>
        </Grid>

      </Grid>

    </Container>
  );
};