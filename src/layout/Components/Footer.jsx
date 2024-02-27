import Box from "@mui/material/Box";

export const Footer = () => {
    return (
        <footer>
            <Box
                sx={{
                    backgroundColor: '#cccccc',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // Cambiado de 'flex-end' a 'center'
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    zIndex: 1000,
                }}
            >
                <p sx={{ AlignItems: 'center' }}> Nodo de interconexión de comunicaciones </p>
            </Box>
        </footer>
    );
};