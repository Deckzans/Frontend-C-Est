import { create } from "zustand";
import {persist} from 'zustand/middleware'

const useAppState = create( 
  persist (
    (set) => ({
      token: "null",
      usuario: null,
      rol: null,
      setCredenciales: (token, usuario, rol) => set({ token, usuario, rol }),
      obtenerEstado: () => set(), // Función para obtener el estado actual
    }), 
    { 
      name:"usuario-storage"
    }
  )
);

export default useAppState;