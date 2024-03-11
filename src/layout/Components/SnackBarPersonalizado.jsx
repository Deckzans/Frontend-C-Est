
import { Snackbar, Alert } from '@mui/material';

export const SnackbarPersonalizado = ({ open, onClose, mensaje }) => {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={650} onClose={onClose}>
      <Alert severity="success" variant="filled">
        {mensaje}
      </Alert>
    </Snackbar>
  );
};
