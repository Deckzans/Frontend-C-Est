
import axios from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import BarraMenu from "../Components/BarraMenu"
import { Footer } from "../Components/Footer"
import useAppState from "../../auth/hooks/estado"
import verificarToken from "../helpers/Verificacion"



export const LayoutPrivate = () => {
  const navigate = useNavigate();
  const { token } = useAppState();

  useEffect(() => {
    // Lógica de verificación del token
    verificarToken(token, navigate);
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
