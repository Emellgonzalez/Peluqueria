# Peluquería GlamStyle - Backend (avance)

**Descripción breve:** Proyecto backend en Node.js + Express + MongoDB con autenticación JWT para gestionar usuarios, servicios y citas.

## Estructura
```
peluqueria-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   └── app.js
├── package.json
└── .env.example
```

## Requisitos
- Node.js 18+
- MongoDB (Atlas o local)

## Instalación
1. Copiar `.env.example` a `.env` y completar `MONGO_URI` y `JWT_SECRET`.
2. `npm install`
3. `npm run dev` (requiere nodemon) o `npm start`

## Endpoints principales
- `POST /api/auth/register` → registrar usuario
- `POST /api/auth/login` → iniciar sesión (obtiene token JWT)
- `GET /api/servicios` → listar servicios
- `POST /api/servicios` → crear servicio (protegido)
- `GET /api/citas` → listar citas (protegido)
- `POST /api/citas` → crear cita (protegido)

## Notas
- Este repositorio es un **avance**: faltan validaciones avanzadas, manejo de roles y tests.
