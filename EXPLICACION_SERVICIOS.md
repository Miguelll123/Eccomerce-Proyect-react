# 📚 Explicación: ¿Qué son los Servicios y Para Qué Sirven?

## 🤔 ¿Qué son los Servicios?

Los **servicios** son funciones que se encargan de **comunicarse con el backend** por ti. Son como "ayudantes" que hacen el trabajo sucio de hacer peticiones HTTP.

---

## 🎯 ¿Para Qué Sirven?

### **Sin Servicios (Complicado):**
```javascript
// En tu componente, tendrías que hacer esto CADA VEZ:
import axios from 'axios';

function ProductList() {
  useEffect(() => {
    // Tienes que recordar la URL completa
    // Tienes que recordar agregar el token
    // Tienes que manejar errores
    axios.get('http://localhost:3000/products', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      // Manejar respuesta
    })
    .catch(error => {
      // Manejar error
    });
  }, []);
}
```

**Problemas:**
- ❌ Tienes que escribir la URL completa cada vez
- ❌ Tienes que recordar agregar el token
- ❌ Código repetitivo en cada componente
- ❌ Si cambia la URL del backend, tienes que cambiar TODO

---

### **Con Servicios (Fácil):**
```javascript
// En tu componente, solo haces esto:
import { productService } from '../services/productService';

function ProductList() {
  useEffect(() => {
    // ¡Solo una línea! El servicio se encarga de todo
    const products = await productService.getAll();
  }, []);
}
```

**Ventajas:**
- ✅ Código limpio y simple
- ✅ No tienes que pensar en URLs, tokens, etc.
- ✅ Si cambia el backend, solo cambias el servicio
- ✅ Reutilizable en cualquier componente

---

## 🔄 Cómo Funcionan los Servicios

### Estructura:

```
Componente React
    ↓ (llama a)
Servicio (productService.getAll())
    ↓ (usa)
API (axios configurado)
    ↓ (hace petición HTTP a)
Backend (Express)
    ↓ (devuelve datos)
API (recibe respuesta)
    ↓ (retorna)
Servicio (retorna los datos)
    ↓ (devuelve)
Componente (muestra los datos)
```

---

## 📝 Ejemplo Práctico

### 1. Servicio (`src/services/productService.js`):

```javascript
import api from './api.js'; // axios ya configurado

export const productService = {
  // Función simple que obtiene productos
  getAll: async () => {
    const response = await api.get('/products');
    return response.data; // Retorna solo los datos
  }
};
```

**¿Qué hace?**
- Se conecta al backend
- Hace la petición GET a `/products`
- Agrega el token automáticamente (gracias a `api.js`)
- Retorna solo los datos (sin toda la información de axios)

---

### 2. Componente (`src/components/ProductList.jsx`):

```javascript
import { productService } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Solo llamas a la función, el servicio hace todo lo demás
    const fetchProducts = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name_product}</div>
      ))}
    </div>
  );
}
```

**¿Qué hace?**
- Llama a `productService.getAll()`
- Recibe los productos
- Los muestra en pantalla
- **NO tiene que pensar en URLs, tokens, o cómo funciona el backend**

---

## 🎨 Analogía Simple

Imagina que quieres pedir una pizza:

### **Sin Servicio:**
- Tienes que llamar al restaurante
- Dar tu dirección
- Explicar qué quieres
- Dar tu número de teléfono
- Esperar
- Pagar
- Recibir la pizza

### **Con Servicio:**
- Solo dices: "Quiero una pizza"
- El servicio se encarga de todo lo demás
- Recibes la pizza

**El servicio es como un asistente que hace todo el trabajo por ti.**

---

## ❓ ¿Tengo que Pensar en el Backend Cada Vez?

### **¡NO!** 🎉

Una vez que creas los servicios, **NO tienes que pensar en el backend** cuando haces frontend.

### Lo que SÍ tienes que saber:

1. **Qué servicios existen:**
   - `productService.getAll()` - Obtener productos
   - `productService.getById(id)` - Obtener un producto
   - `userService.login(email, password)` - Hacer login
   - etc.

2. **Qué datos devuelven:**
   - `productService.getAll()` devuelve un array de productos
   - `userService.login()` devuelve un token y datos del usuario

3. **Qué datos necesitan:**
   - `productService.create(productData)` necesita un objeto con `name_product` y `price`
   - `userService.login()` necesita `email` y `password`

### Lo que NO tienes que saber:

- ❌ La URL del backend
- ❌ Cómo se agrega el token
- ❌ Cómo se manejan los errores
- ❌ Cómo funciona axios
- ❌ Cómo se estructura la petición HTTP

---

## 📋 Lista de Servicios que Tienes

### `productService.js`:
```javascript
productService.getAll()        // Obtener todos los productos
productService.getById(id)     // Obtener un producto por ID
productService.create(data)    // Crear un producto (requiere auth)
productService.update(id, data) // Actualizar un producto (requiere auth)
productService.delete(id)      // Eliminar un producto (requiere auth)
```

### `userService.js`:
```javascript
userService.register(userData)  // Registrar un usuario
userService.login(email, pass)  // Hacer login
userService.logout()            // Cerrar sesión
userService.getProfile()        // Obtener perfil (requiere auth)
```

---

## 🚀 Cómo Usar los Servicios

### Ejemplo 1: Mostrar Productos

```javascript
import { productService } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return <div>{/* mostrar productos */}</div>;
}
```

### Ejemplo 2: Hacer Login

```javascript
import { userService } from '../services/userService';

function LoginForm() {
  const handleLogin = async (email, password) => {
    const response = await userService.login(email, password);
    // El token se guarda automáticamente
    // Redirigir al usuario
  };

  return <form onSubmit={handleLogin}>{/* formulario */}</form>;
}
```

### Ejemplo 3: Crear un Producto

```javascript
import { productService } from '../services/productService';

function CreateProduct() {
  const handleCreate = async () => {
    const newProduct = {
      name_product: 'Nuevo Producto',
      price: 99.99
    };
    const product = await productService.create(newProduct);
    // Producto creado
  };

  return <button onClick={handleCreate}>Crear</button>;
}
```

---

## 🔧 ¿Cuándo Crear un Nuevo Servicio?

Crea un nuevo servicio cuando:

1. **Tienes un nuevo modelo/entidad:**
   - Si tienes `Category` en el backend → crea `categoryService.js`
   - Si tienes `Order` en el backend → crea `orderService.js`

2. **Tienes una nueva funcionalidad:**
   - Si quieres buscar productos → agrega `productService.search(query)`
   - Si quieres filtrar por categoría → agrega `productService.getByCategory(id)`

---

## 📝 Resumen

### Los Servicios son:
- ✅ Funciones que se comunican con el backend
- ✅ Una capa de abstracción (ocultan la complejidad)
- ✅ Reutilizables en cualquier componente
- ✅ Fáciles de mantener y actualizar

### NO tienes que:
- ❌ Pensar en URLs del backend
- ❌ Agregar tokens manualmente
- ❌ Manejar errores de red
- ❌ Recordar cómo funciona axios

### Solo tienes que:
- ✅ Saber qué servicios existen
- ✅ Llamar a la función del servicio
- ✅ Usar los datos que devuelve

---

## 💡 Ejemplo Completo

```javascript
// 1. Importas el servicio
import { productService } from '../services/productService';

// 2. Lo usas en tu componente
function MyComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 3. Llamas a la función (el servicio hace todo lo demás)
    const loadData = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    loadData();
  }, []);

  // 4. Usas los datos normalmente
  return (
    <div>
      {products.map(p => <div key={p.id}>{p.name_product}</div>)}
    </div>
  );
}
```

**¡Eso es todo! No necesitas saber nada más sobre el backend.** 🎉

