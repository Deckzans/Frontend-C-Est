import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Alineación horizontal al centro
          justifyContent: 'center', // Alineación vertical al centro
          padding: '1rem',
          borderTop: '1px solid #e0e0e0',
          boxShadow: '0px -5px 5px -5px rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ color: '#495057', marginBottom: '0.5rem' }}>
            Nodo de interconexión de comunicaciones
          </Typography>
          <Typography variant="caption" sx={{ color: '#868e96' }}>
            © 2024 C5. Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};
