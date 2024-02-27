import axios from 'axios';

export const registarUsuario = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/usuario/agregar', data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
    if (error.response && error.response.status === 409) { 
      // Manejar el caso de usuario duplicado
      throw new Error('Usuario duplicado');
    } else {
      console.error(`Error al intentar iniciar sesión: ${error.message}`);
      throw error;
    }
  }
};
