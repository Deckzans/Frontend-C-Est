import axios from 'axios';
import { apiApp } from '../../api/apiUrl';

export const traerEmpleado = async (id) => {
  try {
    const response = await apiApp.get(`/empleado/obtener/${id}`);
    
    if (response.data.success) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar traer un empleado : ${error.message}`);
      return null;
    //   throw error;
    
  }
};
