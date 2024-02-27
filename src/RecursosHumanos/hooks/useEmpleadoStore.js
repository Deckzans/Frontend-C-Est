import { create } from "zustand";
import { obtenerEmpleados } from "../helpers/fetchEmpleados";


export const useEmpleadoStore = create((set) => ({
    datos: [],
    setDatos: (nuevosDatos) => set({ datos: nuevosDatos }),
    traerEmpleados: async () => {
      try {
        const empleados = await obtenerEmpleados();
        set({ datos: empleados });
      } catch (error) {
        console.error(error);
      }
    }
  }));