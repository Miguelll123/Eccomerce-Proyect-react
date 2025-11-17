// Ejemplo de servicio para usuarios
import api from './api.js';

export const userService = {
  // Registrar un nuevo usuario
  register: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Iniciar sesión
  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Cerrar sesión
  logout: async () => {
    await api.delete('/users/logout');
    localStorage.removeItem('token');
  },

  // Obtener perfil del usuario autenticado
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Confirmar email
  confirmEmail: async (emailToken) => {
    const response = await api.get(`/users/confirm/${emailToken}`);
    return response.data;
  },
};

