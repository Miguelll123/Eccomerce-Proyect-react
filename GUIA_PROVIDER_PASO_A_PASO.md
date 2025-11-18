# 📚 Guía Paso a Paso: Implementar Provider para Productos

## 🎯 Objetivo
Crear un Context con Provider para compartir los productos entre componentes sin hacer múltiples peticiones.

---

## 📋 Paso 1: Crear el Context y Provider

### Archivo: `src/context/ProductContext/ProductContext.jsx`

**¿Qué hacer?**
1. Importar `createContext`, `useContext`, `useState`, `useEffect` de React
2. Importar `axios` para hacer peticiones
3. Importar `API_BASE_URL` de `../../config/api`

**Estructura:**
```javascript
// 1. Crear el Context
const ProductContext = createContext();

// 2. Crear el hook personalizado
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de ProductProvider");
  }
  return context;
};

// 3. Crear el Provider
export const ProductProvider = ({ children }) => {
  // Estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener productos
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar
  useEffect(() => {
    getProducts();
  }, []);

  // Valor que se comparte
  const value = {
    products,
    loading,
    error,
    getProducts, // Por si quieres recargar manualmente
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
```

**¿Por qué?**
- El Context permite compartir datos entre componentes
- El Provider carga los productos UNA VEZ
- Todos los componentes hijos pueden acceder a los mismos datos

---

## 📋 Paso 2: Usar el Provider en App.jsx

### Archivo: `src/App.jsx`

**¿Qué hacer?**
1. Importar `ProductProvider` del Context
2. Envolver el contenido con `<ProductProvider>`

**Antes:**
```javascript
<ConfigProvider locale={esES}>
  <Layout>
    <Products />
  </Layout>
</ConfigProvider>
```

**Después:**
```javascript
<ConfigProvider locale={esES}>
  <ProductProvider>
    <Layout>
      <Products />
    </Layout>
  </ProductProvider>
</ConfigProvider>
```

**¿Por qué?**
- El Provider debe envolver todos los componentes que necesiten los productos
- Si lo pones en App.jsx, todos los componentes pueden acceder

---

## 📋 Paso 3: Usar el hook en el componente Products

### Archivo: `src/components/Products.jsx`

**¿Qué hacer?**
1. Importar `useProducts` del Context
2. Usar el hook para obtener `products`, `loading`, `error`
3. Eliminar `useState` y `useEffect` (ya no los necesitas)
4. Eliminar la petición axios directa

**Antes (sin Provider):**
```javascript
const [products, setProducts] = useState([]);
useEffect(() => {
  axios.get('/products')...
}, []);
```

**Después (con Provider):**
```javascript
const { products, loading, error } = useProducts();
// ¡Ya tienes los datos! No necesitas hacer la petición
```

**¿Por qué?**
- El Provider ya cargó los productos
- Solo necesitas usar el hook para obtenerlos
- Más limpio y simple

---

## 📋 Paso 4: Mostrar los productos

### Archivo: `src/components/Products.jsx`

**¿Qué hacer?**
1. Manejar el estado `loading` (mostrar spinner)
2. Manejar el estado `error` (mostrar mensaje)
3. Mapear `products` para mostrar cada uno
4. Usar `product.image_url` para las imágenes
5. Usar `product.name_product` para el nombre
6. Usar `product.price` para el precio

**Estructura:**
```javascript
if (loading) return <Spin />;
if (error) return <div>{error}</div>;

return (
  <div>
    {products.map((product) => (
      <Card key={product.id}>
        <img src={product.image_url} alt={product.name_product} />
        <h3>{product.name_product}</h3>
        <p>${product.price}</p>
      </Card>
    ))}
  </div>
);
```

**¿Por qué?**
- `loading` te dice si está cargando
- `error` te dice si hubo un problema
- `products` es el array con todos los productos

---

## 🔄 Flujo Completo

```
1. App.jsx se renderiza
   ↓
2. ProductProvider se monta
   ↓
3. useEffect en ProductProvider ejecuta getProducts()
   ↓
4. getProducts() hace petición a /products
   ↓
5. setProducts() guarda los datos en el estado
   ↓
6. Products.jsx usa useProducts()
   ↓
7. useProducts() devuelve { products, loading, error }
   ↓
8. Products.jsx muestra los productos
```

---

## ✅ Checklist

- [ ] Paso 1: Crear ProductContext.jsx con Context y Provider
- [ ] Paso 2: Envolver App.jsx con ProductProvider
- [ ] Paso 3: Usar useProducts() en Products.jsx
- [ ] Paso 4: Mostrar productos con imágenes
- [ ] Probar que funciona

---

## 🎯 Ventajas de usar Provider

1. **Una sola petición**: Los productos se cargan una vez
2. **Compartir datos**: Cualquier componente puede usar `useProducts()`
3. **Código limpio**: No duplicas lógica de peticiones
4. **Fácil de mantener**: Si cambias algo, solo lo cambias en un lugar

---

## 💡 Ejemplo de uso en otros componentes

Si más adelante quieres usar productos en otro componente:

```javascript
import { useProducts } from '../context/ProductContext/ProductContext';

function Cart() {
  const { products } = useProducts();
  // Ya tienes los productos sin hacer otra petición
}
```

---

¡Sigue estos pasos en orden y tendrás el Provider funcionando! 🚀


