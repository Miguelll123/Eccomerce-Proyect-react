# 🛒 Ecommerce Frontend

Frontend de la aplicación de ecommerce desarrollado con React y Vite.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

## 🔗 Conexión con el Backend

Este frontend se conecta al backend que debe estar corriendo en `http://localhost:3000`.

Asegúrate de que el backend esté iniciado antes de usar la aplicación.

## 📦 Dependencias Principales

- React 19.2.0
- Vite 7.2.2
- Axios 1.13.2
- React Router DOM 7.9.6

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── api.js          # Configuración de la URL del API
├── services/
│   ├── api.js          # Instancia de axios configurada
│   ├── productService.js  # Servicios para productos
│   └── userService.js     # Servicios para usuarios
└── ...
```

## 🔐 Autenticación

El token de autenticación se guarda automáticamente en `localStorage` al iniciar sesión y se incluye en todas las peticiones mediante interceptores de axios.
