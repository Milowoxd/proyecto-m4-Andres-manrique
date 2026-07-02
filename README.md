# MateCode Tasks

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Aplicacion web de gestion de tareas con autenticacion de usuarios, persistencia en la nube y notificaciones por email.

## Demo en vivo

[matecode-tasks.vercel.app](https://matecode-tasks.vercel.app)

---

## Que hace esta aplicacion?

MateCode Tasks permite a los usuarios:

- Registrarse e iniciar sesion con email/password o con Google
- Crear, editar, eliminar y marcar tareas como completadas
- Ver sus tareas sincronizadas en tiempo real desde cualquier dispositivo
- Recibir un resumen de sus tareas por email con un solo clic

---

## Tecnologias utilizadas

| Tecnologia | Para que se usa |
|---|---|
| React + TypeScript | Interfaz de usuario con tipado estatico |
| Firebase Authentication | Registro e inicio de sesion de usuarios |
| Cloud Firestore | Base de datos en la nube en tiempo real |
| AWS SES | Envio de emails |
| Vercel | Deploy y hosting |
| Vercel Serverless Functions | Proxy seguro para AWS SES |
| Vitest | Tests unitarios |

---

## Estructura del proyecto

```
matecode-tasks/
├── api/
│   └── send-email.js       # Funcion serverless que envia emails con AWS SES
├── src/
│   ├── pages/              # Vistas completas de la aplicacion
│   │   ├── Login.tsx       # Pantalla de inicio de sesion
│   │   ├── Register.tsx    # Pantalla de registro
│   │   └── Tasks.tsx       # Pantalla principal de tareas
│   ├── components/         # Componentes reutilizables de UI
│   │   ├── TaskForm.tsx    # Formulario para crear y editar tareas
│   │   ├── TaskItem.tsx    # Componente de una tarea individual
│   │   └── TaskList.tsx    # Lista de tareas
│   ├── features/
│   │   └── auth/
│   │       └── AuthContext.tsx  # Contexto global de autenticacion
│   ├── services/           # Conexion con servicios externos
│   │   ├── firebase.ts     # Configuracion de Firebase
│   │   ├── authService.ts  # Funciones de login, registro y logout
│   │   └── taskService.ts  # Funciones de CRUD con Firestore
│   ├── routes/
│   │   ├── AppRouter.tsx       # Configuracion de rutas
│   │   └── ProtectedRoute.tsx  # Protege rutas privadas
│   ├── hooks/
│   │   └── useTasks.ts     # Hook personalizado para gestionar tareas
│   └── types/
│       └── index.ts        # Tipos e interfaces de TypeScript
├── tests/
│   ├── utils.test.ts       # Tests unitarios
│   └── setup.ts            # Configuracion de tests
├── .env                    # Variables de entorno locales (NO se sube a Git)
├── .env.example            # Plantilla de variables de entorno
├── vercel.json             # Configuracion de Vercel
└── README.md
```

---

## Requisitos previos

Antes de instalar el proyecto necesitas tener:

- [Node.js](https://nodejs.org) v18 o superior
- [Git](https://git-scm.com)
- [Vercel CLI](https://vercel.com/cli): `npm install -g vercel`
- Una cuenta en [Firebase](https://console.firebase.google.com)
- Una cuenta en [AWS](https://aws.amazon.com) con SES configurado
- Una cuenta en [Vercel](https://vercel.com)

---

## Instalacion paso a paso

**Paso 1 — Clona el repositorio:**
```bash
git clone https://github.com/Milowoxd/proyecto-m4-Andres-manrique.git
cd proyecto-m4-Andres-manrique
```

**Paso 2 — Instala las dependencias:**
```bash
npm install
```

Esto instala todas las librerias necesarias que estan listadas en `package.json`.

**Paso 3 — Configura las variables de entorno:**
```bash
cp .env.example .env
```

Abre el archivo `.env` y completa cada variable con tus credenciales.

**Paso 4 — Vincula el proyecto con Vercel:**
```bash
vercel link
vercel env pull
```

Esto conecta tu proyecto local con Vercel y descarga las variables de entorno de produccion.

**Paso 5 — Ejecuta el proyecto localmente:**
```bash
vercel dev
```

Abre el navegador en `http://localhost:3000`.

> Importante: usa `vercel dev` y no `npm run dev`. La razon es que `vercel dev` simula el entorno de produccion completo, incluyendo las Serverless Functions que necesita el envio de emails. Con `npm run dev` solo corre el frontend y el boton de email no funciona.

---

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con estas variables:

```
# Firebase - Credenciales de tu proyecto en Firebase Console
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# AWS SES - Credenciales de tu usuario IAM en AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_SES_FROM_EMAIL=tu@email.com
```

> Las variables que empiezan con `VITE_` son accesibles desde el navegador. Las variables de AWS no llevan ese prefijo porque solo se usan en el servidor.

---

## Como ejecutar los tests

```bash
npm run test:run
```

Resultado esperado:

```
Test Files  1 passed (1)
     Tests  9 passed (9)
```

---

## Como desplegar en Vercel

**1. Agrega las variables de entorno en Vercel:**
```bash
vercel env add NOMBRE_VARIABLE
```

**2. Despliega a produccion:**
```bash
vercel --prod
```

---

## Flujo de envio de emails

Asi funciona el boton "Enviar resumen por email":

```
1. Usuario hace clic en el boton
           ↓
2. El frontend hace POST a /api/send-email
   con la lista de tareas y el email del usuario
           ↓
3. Vercel ejecuta la Serverless Function (api/send-email.js)
   en el servidor, nunca en el navegador
           ↓
4. La funcion llama a AWS SES usando las credenciales
   que estan guardadas como variables de entorno del servidor
           ↓
5. AWS SES envia el email con el resumen de tareas
           ↓
6. La funcion retorna exito o error al frontend
           ↓
7. El usuario ve un mensaje de confirmacion o error
```

Por que no llamamos a AWS directamente desde el frontend?
Porque las credenciales de AWS quedarian expuestas en el codigo del navegador y cualquiera podria verlas con las DevTools. La Serverless Function actua como intermediario seguro.

---

## Decisiones arquitectonicas

**Por que React + TypeScript?**
TypeScript agrega tipado estatico a JavaScript. Esto significa que si intentas usar una propiedad que no existe en un objeto, el editor te avisa antes de ejecutar el codigo. Reduce errores y hace el codigo mas facil de mantener.

**Por que Firebase?**
Firebase ofrece autenticacion y base de datos listos para usar sin necesidad de construir un backend propio. Firestore en particular permite escuchar cambios en tiempo real con `onSnapshot`, lo que significa que si dos usuarios abren la app al mismo tiempo, los cambios de uno aparecen automaticamente en el otro.

**Por que Vercel Serverless Functions?**
Las credenciales de AWS no pueden estar en el frontend porque cualquiera podria verlas en el codigo del navegador. Las Serverless Functions corren en el servidor de Vercel y tienen acceso a variables de entorno privadas.

---

## Integracion de IA en el proceso de trabajo

Este proyecto fue desarrollado con asistencia de Claude (Anthropic).

**Donde fue mas util:**

- Resolucion del error de compatibilidad entre CommonJS (`require`) y ES Modules (`import`) en las Vercel Functions
- Configuracion de reglas de seguridad en Firestore para que cada usuario solo vea sus propias tareas
- Implementacion del patron `onSnapshot` para sincronizacion en tiempo real
- Diseno del sistema de tipos en TypeScript

**Patrones descubiertos:**

- Usar `import type` en vez de `import` para interfaces de TypeScript evita errores de runtime en Vite
- Las Vercel Functions deben usar `export default` cuando el `package.json` tiene `"type": "module"`
- El cleanup de `useEffect` con `return () => unsubscribe()` es obligatorio con `onSnapshot` para evitar memory leaks
- Centralizar los mensajes de error de Firebase en una funcion `getAuthErrorMessage` hace el codigo mas limpio y la experiencia de usuario mejor