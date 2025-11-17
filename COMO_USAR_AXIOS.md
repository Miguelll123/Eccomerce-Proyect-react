# 📡 Guía: Cómo Usar Axios Directamente

## 🎯 Importar Axios

Siempre importa la instancia configurada de `api` (no axios directamente):

```javascript
import api from '../services/api';
```

**¿Por qué?** Porque `api` ya tiene:
- ✅ La URL del backend configurada
- ✅ El token JWT se agrega automáticamente
- ✅ Manejo de errores 401

---

## 📝 Ejemplos de Uso

### 1. GET - Obtener Datos

```javascript
import api from '../services/api';

// Obtener todos los productos
const response = await api.get('/products');
const products = response.data;

// Obtener un producto por ID
const response = await api.get('/products/1');
const product = response.data;
```

### 2. POST - Crear Datos

```javascript
import api from '../services/api';

// Crear un producto (requiere auth + admin)
const newProduct = {
  name_product: 'Nuevo Producto',
  price: 99.99
};

const response = await api.post('/products', newProduct);
const createdProduct = response.data;
```

### 3. PUT - Actualizar Datos

```javascript
import api from '../services/api';

// Actualizar un producto (requiere auth + admin)
const updatedData = {
  name_product: 'Producto Actualizado',
  price: 149.99
};

const response = await api.put('/products/1', updatedData);
const updatedProduct = response.data;
```

### 4. DELETE - Eliminar Datos

```javascript
import api from '../services/api';

// Eliminar un producto (requiere auth + admin)
const response = await api.delete('/products/1');
// response.data contiene la respuesta del servidor
```

### 5. POST - Login

```javascript
import api from '../services/api';

// Hacer login
const loginData = {
  email: 'usuario@example.com',
  password: 'password123'
};

const response = await api.post('/users/login', loginData);
const { token, user } = response.data;

// Guardar el token (se guarda automáticamente en localStorage por el interceptor)
localStorage.setItem('token', token);
```

---

## 🔧 Ejemplo Completo en un Componente

```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name_product}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📋 Endpoints Disponibles

### Users (`/users`)
- `GET /users` - Obtener todos (requiere auth)
- `POST /users` - Registrar usuario
- `POST /users/login` - Login
- `GET /users/profile` - Obtener perfil (requiere auth)
- `GET /users/confirm/:emailToken` - Confirmar email
- `PUT /users/id/:id` - Actualizar (requiere auth)
- `DELETE /users/logout` - Logout (requiere auth)
- `DELETE /users/id/:id` - Eliminar (requiere auth)

### Products (`/products`)
- `GET /products` - Obtener todos
- `GET /products/:id` - Obtener por ID
- `POST /products` - Crear (requiere auth + admin)
- `PUT /products/:id` - Actualizar (requiere auth + admin)
- `DELETE /products/:id` - Eliminar (requiere auth + admin)

### Categories (`/categories`)
- `GET /categories` - Obtener todas
- `GET /categories/:id` - Obtener por ID
- `GET /categories/search/name/:name` - Buscar por nombre
- `POST /categories` - Crear (requiere auth + admin)
- `PUT /categories/:id` - Actualizar (requiere auth + admin)
- `DELETE /categories/:id` - Eliminar (requiere auth + admin)

### Orders (`/orders`)
- `GET /orders` - Obtener todas (requiere auth)
- `GET /orders/:id` - Obtener por ID (requiere auth)
- `POST /orders` - Crear (requiere auth)
- `DELETE /orders/:id` - Eliminar (requiere auth)

---

## ⚠️ Manejo de Errores

```javascript
try {
  const response = await api.get('/products');
  const products = response.data;
} catch (error) {
  if (error.response) {
    // El servidor respondió con un código de error
    console.error('Error:', error.response.status);
    console.error('Mensaje:', error.response.data);
  } else if (error.request) {
    // La petición se hizo pero no hubo respuesta
    console.error('No hay respuesta del servidor');
  } else {
    // Algo más pasó
    console.error('Error:', error.message);
  }
}
```

---

## 🔐 Autenticación

El token JWT se agrega automáticamente a todas las peticiones si existe en `localStorage`.

**Para hacer login:**
```javascript
const response = await api.post('/users/login', { email, password });
const { token } = response.data;
localStorage.setItem('token', token); // Se guarda automáticamente
```

**Para hacer logout:**
```javascript
await api.delete('/users/logout');
localStorage.removeItem('token');
```

---

## 💡 Tips

1. **Siempre usa `api`** (no `axios` directamente)
2. **Los datos están en `response.data`**
3. **Usa `try/catch`** para manejar errores
4. **El token se agrega automáticamente** si existe en localStorage
5. **Consulta Swagger** para ver todos los endpoints: `http://localhost:3000/api-docs`

