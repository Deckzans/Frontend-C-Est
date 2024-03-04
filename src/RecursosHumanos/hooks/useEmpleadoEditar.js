import axios from 'axios';

export const traerEmpleado = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/empleado/obtener/${id}`);
    
    if (response.data.success) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar traer un empleado : ${error.message}`);
      return null;
    //   throw error;
    
  }
};
