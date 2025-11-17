# 🚀 Guía de Configuración Git - Frontend

## 📋 Estructura de Ramas

```
main (producción)
  └── develop (desarrollo)
       ├── feature/login
       ├── feature/products
       ├── feature/cart
       └── ...
```

## 🔧 Pasos para Configurar

### 1. Inicializar el Repositorio Local

```bash
cd Froontend/Froontend
git init
git branch -M main
```

### 2. Hacer el Primer Commit

```bash
git add .
git commit -m "Initial commit: React frontend setup"
```

### 3. Crear la Rama Develop

```bash
git checkout -b develop
```

### 4. Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com/new)
2. Nombre del repositorio: `ecommerce-frontend` (o el que prefieras)
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Crea el repositorio

### 5. Conectar el Repositorio Local con GitHub

```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/ecommerce-frontend.git

# Subir la rama main
git checkout main
git push -u origin main

# Subir la rama develop
git checkout develop
git push -u origin develop
```

### 6. Configurar la Rama por Defecto en GitHub

1. Ve a tu repositorio en GitHub
2. Settings → Branches
3. Default branch → Cambia a `develop`
4. Esto hará que `develop` sea la rama principal de trabajo

## 🌿 Flujo de Trabajo (Git Flow)

### Para Trabajar en una Nueva Feature

```bash
# 1. Asegúrate de estar en develop y actualizada
git checkout develop
git pull origin develop

# 2. Crea una nueva rama feature
git checkout -b feature/nombre-de-la-feature
# Ejemplo: git checkout -b feature/login

# 3. Trabaja en tu feature y haz commits
git add .
git commit -m "feat: agregar formulario de login"

# 4. Cuando termines, sube la rama
git push -u origin feature/nombre-de-la-feature

# 5. Crea un Pull Request en GitHub de feature → develop
```

### Para Hacer Merge a Develop

1. Ve a GitHub
2. Crea un Pull Request: `feature/nombre` → `develop`
3. Revisa los cambios
4. Haz merge cuando esté listo

### Para Subir a Producción (main)

```bash
# 1. Asegúrate de que develop esté actualizada
git checkout develop
git pull origin develop

# 2. Merge develop a main
git checkout main
git merge develop

# 3. Sube a producción
git push origin main
```

## 📝 Convención de Commits

Usa prefijos claros:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Formato, estilos
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```bash
git commit -m "feat: agregar componente de login"
git commit -m "fix: corregir error en validación de formulario"
git commit -m "style: mejorar diseño del header"
```

## ⚠️ Reglas Importantes

1. **NUNCA** hagas commit directo a `main` (solo desde develop)
2. **SIEMPRE** trabaja en ramas feature desde `develop`
3. **SIEMPRE** actualiza `develop` antes de crear una nueva feature
4. **SIEMPRE** haz Pull Request para mergear a `develop`

## 🔄 Comandos Útiles

```bash
# Ver todas las ramas
git branch -a

# Ver el estado actual
git status

# Ver el historial de commits
git log --oneline --graph --all

# Descartar cambios locales
git checkout -- .

# Actualizar develop desde remoto
git checkout develop
git pull origin develop
```

