# 📡 Guía: Usar Axios Directamente (Sin api.js)

## 🎯 Importar Axios

```javascript
import axios from 'axios';
```

## 🔧 Configuración Base

Define la URL del backend:

```javascript
const API_URL = 'http://localhost:3000';
```

---

## 📝 Ejemplos de Uso

### 1. GET - Obtener Datos

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Obtener todos los productos
const response = await axios.get(`${API_URL}/products`);
const products = response.data;

// Obtener un producto por ID
const response = await axios.get(`${API_URL}/products/1`);
const product = response.data;

// Con autenticación (agregar token)
const token = localStorage.getItem('token');
const response = await axios.get(`${API_URL}/users/profile`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 2. POST - Crear Datos

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Crear un producto (sin auth)
const newProduct = {
  name_product: 'Nuevo Producto',
  price: 99.99
};

const response = await axios.post(`${API_URL}/products`, newProduct);
const createdProduct = response.data;

// Con autenticación
const token = localStorage.getItem('token');
const response = await axios.post(`${API_URL}/products`, newProduct, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 3. PUT - Actualizar Datos

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const updatedData = {
  name_product: 'Producto Actualizado',
  price: 149.99
};

const token = localStorage.getItem('token');
const response = await axios.put(`${API_URL}/products/1`, updatedData, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const updatedProduct = response.data;
```

### 4. DELETE - Eliminar Datos

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const token = localStorage.getItem('token');
const response = await axios.delete(`${API_URL}/products/1`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 5. POST - Login

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const loginData = {
  email: 'usuario@example.com',
  password: 'password123'
};

const response = await axios.post(`${API_URL}/users/login`, loginData);
const { token, user } = response.data;

// Guardar el token manualmente
localStorage.setItem('token', token);
```

---

## 🔧 Ejemplo Completo en un Componente

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products`);
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

## 🔐 Autenticación - Agregar Token Manualmente

**Siempre que necesites autenticación, agrega el token:**

```javascript
const token = localStorage.getItem('token');

const response = await axios.get(`${API_URL}/users/profile`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**O crea una función helper:**

```javascript
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined
    }
  };
};

// Uso:
const response = await axios.get(`${API_URL}/users/profile`, getAuthHeaders());
```

---

## ⚠️ Manejo de Errores

```javascript
try {
  const response = await axios.get(`${API_URL}/products`);
  const products = response.data;
} catch (error) {
  if (error.response) {
    // El servidor respondió con un código de error
    if (error.response.status === 401) {
      // No autorizado - eliminar token y redirigir
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
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

## 📋 Endpoints Disponibles

### Users (`/users`)
- `GET ${API_URL}/users` - Obtener todos (requiere auth)
- `POST ${API_URL}/users` - Registrar usuario
- `POST ${API_URL}/users/login` - Login
- `GET ${API_URL}/users/profile` - Obtener perfil (requiere auth)
- `GET ${API_URL}/users/confirm/:emailToken` - Confirmar email
- `PUT ${API_URL}/users/id/:id` - Actualizar (requiere auth)
- `DELETE ${API_URL}/users/logout` - Logout (requiere auth)
- `DELETE ${API_URL}/users/id/:id` - Eliminar (requiere auth)

### Products (`/products`)
- `GET ${API_URL}/products` - Obtener todos
- `GET ${API_URL}/products/:id` - Obtener por ID
- `POST ${API_URL}/products` - Crear (requiere auth + admin)
- `PUT ${API_URL}/products/:id` - Actualizar (requiere auth + admin)
- `DELETE ${API_URL}/products/:id` - Eliminar (requiere auth + admin)

### Categories (`/categories`)
- `GET ${API_URL}/categories` - Obtener todas
- `GET ${API_URL}/categories/:id` - Obtener por ID
- `GET ${API_URL}/categories/search/name/:name` - Buscar por nombre
- `POST ${API_URL}/categories` - Crear (requiere auth + admin)
- `PUT ${API_URL}/categories/:id` - Actualizar (requiere auth + admin)
- `DELETE ${API_URL}/categories/:id` - Eliminar (requiere auth + admin)

### Orders (`/orders`)
- `GET ${API_URL}/orders` - Obtener todas (requiere auth)
- `GET ${API_URL}/orders/:id` - Obtener por ID (requiere auth)
- `POST ${API_URL}/orders` - Crear (requiere auth)
- `DELETE ${API_URL}/orders/:id` - Eliminar (requiere auth)

---

## 💡 Tips

1. **Define `API_URL` una vez** al inicio del archivo o en un archivo de configuración
2. **Agrega el token manualmente** en cada petición que requiera auth
3. **Usa `try/catch`** para manejar errores
4. **Maneja errores 401** para redirigir al login
5. **Consulta Swagger** para ver todos los endpoints: `http://localhost:3000/api-docs`

---

## ⚠️ Lo que Perdiste al Eliminar api.js

- ❌ Configuración automática de baseURL
- ❌ Token agregado automáticamente
- ❌ Manejo automático de errores 401
- ❌ Tienes que escribir la URL completa cada vez
- ❌ Tienes que agregar el token manualmente en cada petición

Pero ahora tienes **control total** sobre cada petición. 🎯

