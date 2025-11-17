// Ejemplo de servicio para productos
import api from './api.js';

export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Crear un producto (requiere autenticación y ser admin)
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Actualizar un producto (requiere autenticación y ser admin)
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Eliminar un producto (requiere autenticación y ser admin)
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

