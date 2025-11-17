# 🔗 Guía de Conexión Backend-Frontend

## ✅ Estado Actual de la Conexión

### Backend (Ecommerce)
- ✅ **CORS configurado** para aceptar peticiones desde `http://localhost:5173`
- ✅ **Puerto**: 3000
- ✅ **URL**: `http://localhost:3000`
- ✅ **Rutas disponibles**: `/users`, `/products`, `/categories`, `/orders`

### Frontend (Froontend)
- ✅ **Configuración de API** en `src/config/api.js`
- ✅ **Servicio de axios** configurado en `src/services/api.js`
- ✅ **Servicios creados**: `productService.js`, `userService.js`
- ✅ **Componente de prueba**: `ProductList.jsx`

## 🚀 Cómo Probar la Conexión

### 1. Iniciar el Backend

```bash
cd Ecommerce
npm run dev
```

Deberías ver:
```
Server listening on http://localhost:3000
```

### 2. Iniciar el Frontend

```bash
cd Froontend/Froontend
npm install  # Si no has instalado las dependencias
npm run dev
```

Deberías ver:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 3. Verificar la Conexión

1. Abre el navegador en `http://localhost:5173`
2. Deberías ver la lista de productos del backend
3. Si ves "Error al cargar los productos", verifica:
   - Que el backend esté corriendo
   - Que la base de datos esté configurada
   - Que haya productos en la base de datos

## 🔧 Cómo Funciona la Conexión

### Flujo de Datos:

```
Frontend (React) 
    ↓
src/services/productService.js
    ↓
src/services/api.js (axios configurado)
    ↓
http://localhost:3000/products
    ↓
Backend (Express)
    ↓
routes/product.js
    ↓
controllers/ProductController.js
    ↓
Base de Datos (MySQL)
```

### CORS (Cross-Origin Resource Sharing)

**¿Qué es?** 
CORS permite que el frontend (puerto 5173) haga peticiones al backend (puerto 3000).

**Configuración actual:**
```javascript
// Backend: Ecommerce/index.js
app.use(cors({
    origin: 'http://localhost:5173', // ✅ Permite peticiones desde el frontend
    credentials: true, // ✅ Permite enviar cookies/tokens
}))
```

**¿Hace falta algo más?** 
No, ya está configurado correctamente.

## 📝 Ejemplo de Uso

### Obtener Productos

```javascript
import { productService } from '../services/productService';

// En un componente
const products = await productService.getAll();
console.log(products); // Array de productos
```

### Crear un Producto (requiere auth + admin)

```javascript
import { productService } from '../services/productService';

const newProduct = {
  name_product: 'Nuevo Producto',
  price: 99.99
};

const product = await productService.create(newProduct);
```

### Login de Usuario

```javascript
import { userService } from '../services/userService';

const response = await userService.login('email@example.com', 'password');
// El token se guarda automáticamente en localStorage
```

## ⚠️ Solución de Problemas

### Error: "Network Error" o "CORS Error"
- ✅ Verifica que el backend esté corriendo en `http://localhost:3000`
- ✅ Verifica que el frontend esté en `http://localhost:5173`
- ✅ Revisa la consola del navegador (F12) para más detalles

### Error: "Cannot GET /products"
- ✅ Verifica que el backend tenga la ruta `/products` configurada
- ✅ Verifica que el backend esté escuchando en el puerto 3000

### Error: "401 Unauthorized"
- ✅ Necesitas autenticarte primero (hacer login)
- ✅ El token se guarda automáticamente en localStorage

### No se muestran productos
- ✅ Verifica que haya productos en la base de datos
- ✅ Ejecuta los seeders: `npx sequelize-cli db:seed:all`

## 🎯 Próximos Pasos

1. ✅ Conexión básica funcionando
2. ⏳ Crear más componentes (Login, ProductDetail, Cart, etc.)
3. ⏳ Implementar autenticación completa
4. ⏳ Agregar manejo de errores más robusto
5. ⏳ Agregar loading states y animaciones

