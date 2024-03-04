
import axios from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import BarraMenu from "../Components/BarraMenu"
import { Footer } from "../Components/Footer"
import useAppState from "../../auth/hooks/estado"

export const LayoutPrivate = () => {
  const navigate = useNavigate();
  const { token } = useAppState();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        // Hacer la solicitud al backend para verificar el token
        const response = await axios.post('http://localhost:3000/usuario/verificar-token', {
          token,
        });

        if (response.data.success) {
          // Token válido, continuar con la lógica de LayoutPrivate
          console.log('Token válido');
        } else {
          // Token no válido, redirigir al login
          console.log('Token no válido');
          navigate('/');
        }
      } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al verificar el token:', error);
        // Podrías redirigir al login en caso de un error
        navigate('/');
      }
    };

    verificarToken();
  }, [token, navigate]);



  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <BarraMenu />

        <div style={{ flex: 1, minHeight: 0 }}>
          {/* Contenido del Outlet */}
          <Outlet />
        </div>

        <Footer />
      </div>

    </>
  )
}
