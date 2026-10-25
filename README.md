# A Nice World — React + Node.js + Express + MySQL

Proyecto académico para consultar horarios de recolección y aprender sobre reciclaje. Incluye autenticación de usuarios y una API REST con operaciones CRUD.

## Requisitos
- Node.js 18 o superior
- MySQL 8 (o compatible)
- npm
- Postman para probar la API (opcional)

## 1. Preparar la base de datos
1. Abre MySQL Workbench o tu cliente MySQL.
2. Ejecuta el contenido de `backend/database.sql`.
3. Copia `backend/.env.example` a `backend/.env`.
4. Edita `backend/.env` y escribe tu usuario y contraseña reales de MySQL. Cambia también `JWT_SECRET` por una clave larga.

Sequelize creará la tabla `usuarios` al iniciar el servidor.

## 2. Iniciar backend
En una terminal:
```bash
cd backend
npm install
npm run dev
```
Debe aparecer `Conectado a MySQL mediante Sequelize` y `Servidor NICE WORLD corriendo en http://localhost:3000`.

Comprueba `http://localhost:3000/api/health` en el navegador. Debe devolver un JSON con estado `ok`.

## 3. Iniciar frontend
Abre otra terminal desde la carpeta principal:
```bash
npm install
npm run dev
```
Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

La primera pantalla permite iniciar sesión o crear una cuenta. El registro guarda el usuario en MySQL; la contraseña se almacena como hash bcrypt, no como texto plano. Cuando el registro termina correctamente se inicia la sesión y aparece la página. Usa **Cerrar sesión** para volver al acceso.

## Endpoints
Todos usan el prefijo `http://localhost:3000/api`.

| Método | Endpoint | Acceso | Función |
|---|---|---|---|
| GET | `/health` | Público | Verifica que la API está activa |
| POST | `/auth/register` | Público | Registrar una cuenta |
| POST | `/auth/login` | Público | Iniciar sesión y obtener JWT |
| GET | `/usuarios` | JWT | Listar usuarios |
| GET | `/usuarios/:id` | JWT | Consultar un usuario por ID |
| POST | `/usuarios` | JWT | Crear usuario |
| PUT | `/usuarios/:id` | JWT | Actualizar nombre, correo o contraseña |
| DELETE | `/usuarios/:id` | JWT | Eliminar usuario |

### Ejemplos de cuerpos JSON
Registro:
```json
{"nombre":"Emmanuel","correo":"emmanuel@example.com","password":"ClaveSegura123"}
```
Inicio de sesión:
```json
{"correo":"emmanuel@example.com","password":"ClaveSegura123"}
```
Actualizar usuario:
```json
{"nombre":"Nombre actualizado"}
```

Para las rutas protegidas agrega el encabezado `Authorization: Bearer TU_TOKEN`, usando el token que devuelve `/auth/login` o `/auth/register`.

## Pruebas
- Importa `backend/postman_collection.json` en Postman.
- Ejecuta primero **Salud API**, después **Registrar cuenta** (usa un correo que no exista) o **Iniciar sesión**.
- Copia el campo `token` de la respuesta a la variable `token` de la colección.
- Ajusta `usuarioId` a un ID existente y ejecuta GET, POST, PUT y DELETE.
- Para pruebas automatizadas de validaciones ejecuta `cd backend` y `npm test`.

## Estructura del backend
```text
backend/
├── src/
│   ├── config/database.js
│   ├── models/Usuario.js
│   ├── services/usuario.service.js
│   ├── controllers/auth.controller.js
│   ├── controllers/usuario.controller.js
│   ├── routes/auth.routes.js
│   ├── routes/usuario.routes.js
│   ├── middlewares/autenticacion.js
│   ├── middlewares/validaciones.js
│   ├── app.js
│   └── server.js
├── tests/validaciones.test.js
├── database.sql
├── postman_collection.json
└── .env.example
```

## Buenas prácticas incluidas
- Separación de rutas, controladores, servicios, modelos y configuración.
- Validación de entradas y middleware centralizado de errores.
- Contraseñas protegidas con bcrypt y endpoints CRUD protegidos con JWT.
- CORS configurado, Helmet, límite al JSON recibido y variables de entorno.

**Nota académica:** el CRUD de usuarios está protegido por inicio de sesión, pero en una aplicación de producción se debe añadir autorización por roles y limitar la consulta/modificación de usuarios según permisos.
