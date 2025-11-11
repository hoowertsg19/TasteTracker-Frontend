# TasteTracker Frontend

Frontend SPA para la plataforma TasteTracker. Construida con Vue 3 + TypeScript y Vite, consumiendo una API REST Laravel (Sanctum). Este documento explica todo lo necesario para que cualquier persona pueda instalar y ejecutar el proyecto rápidamente.

## Tecnologías principales

- Node.js (engines: `^20.19.0 || >=22.12.0`)
- pnpm (gestor de paquetes) + `pnpm-lock.yaml` para instalaciones reproducibles
- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite (dev server y build)
- Vue Router 4 (rutas protegidas y públicas)
- Axios (cliente HTTP con interceptores de auth)
- TailwindCSS v4 (a través del plugin `@tailwindcss/vite`)
- ESLint + Prettier (estilo y calidad de código)
- Volar (soporte TS en archivos `.vue`)

## Requisitos previos

1. Instalar Node.js versión soportada:

- Verifica con: `node -v`
- Descarga: https://nodejs.org/en

2. Instalar pnpm global (si no lo tienes):

```powershell
npm install -g pnpm
```

3. (Opcional) Instalar VS Code + extensiones recomendadas (ver más abajo).

## Clonar e instalar dependencias

```powershell
git clone https://github.com/hoowertsg19/TasteTracker-Frontend.git
cd TasteTracker-Frontend
pnpm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz (NO se versiona) con las siguientes claves usadas por `src/config/env.ts`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=TasteTracker
VITE_MODE=local
```

Notas:

- Usa el prefijo `VITE_` para que Vite exponga la variable en `import.meta.env`.
- Ajusta `VITE_API_URL` según el puerto/host de tu backend Laravel (`/api` / `/api/v1` según tu configuración).

## Scripts disponibles

| Script            | Propósito                                      |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Inicia el servidor de desarrollo Vite con HMR  |
| `pnpm build`      | Build producción (`type-check` + `vite build`) |
| `pnpm preview`    | Sirve el build en modo preview                 |
| `pnpm type-check` | Compila tipos con `vue-tsc`                    |
| `pnpm lint`       | Ejecuta ESLint (auto-fix + cache)              |
| `pnpm format`     | Formatea código fuente con Prettier            |

## Flujo de desarrollo recomendado

```powershell
pnpm install
pnpm dev  # Levanta entorno local
# Edita código, revisa consola y DevTools
pnpm type-check  # Antes de commitear
pnpm lint        # Corrige estilo
pnpm build       # Verifica build final
```

## Autenticación / API

- El cliente HTTP (`src/services/httpClient.ts`) agrega automáticamente el header `Authorization: Bearer <token>` si existe `localStorage.auth_token`.
- Respuestas 401 forzarán redirección a la ruta de Login.
- Ajusta endpoints base en `.env` (`VITE_API_URL`). Actualmente se asume prefijo `/v1` para recursos (`/v1/menu`, `/v1/pedidos`, etc.).

## Estructura relevante

```
src/
  composables/useAuth.ts      # Estado y acciones de autenticación
  services/                   # Servicios HTTP (menu, pedidos, clientes, empleados)
  types/                      # Modelos TypeScript alineados al backend
  views/                      # Vistas (Login, Register, Menu, Pedidos, etc.)
  router/index.ts             # Definición de rutas y guard global
  config/env.ts               # Carga de variables de entorno
```

## Estándares de código

- TypeScript estricto para modelos y peticiones
- Validación frontend antes de enviar formularios (ej. pedidos: detalles, ids, `numero_mesa` string)
- Lint + format integrados en CI local con scripts.

## Extensiones recomendadas VS Code

- Vue (Official) / Volar
- ESLint
- Prettier
- TypeScript Vue Plugin (integrado con Volar)

## Troubleshooting rápido

| Problema                       | Causa común              | Solución                                              |
| ------------------------------ | ------------------------ | ----------------------------------------------------- |
| 401 tras login                 | Token no persistido      | Verificar `localStorage.auth_token` y backend Sanctum |
| 422 en pedidos (`numero_mesa`) | Tipo incorrecto (number) | Asegurar string en formulario (ya corregido)          |
| Cambios de `.env` no aplican   | Cache dev server         | Reiniciar `pnpm dev` tras editar `.env`               |
| Error de tipos en `.vue`       | Falta Volar              | Instalar extensión oficial Vue                        |

## Build y despliegue

1. Ejecutar build:

```powershell
pnpm build
```

2. Servir contenido estático (ejemplo con cualquier servidor estático o integrar en Laravel `public/` si se desea).
3. Usar `pnpm preview` para validar antes de subir.

## Licencia

Proyecto privado (ajusta este apartado si defines una licencia abierta más adelante).

---

Si necesitas añadir más pasos específicos de backend (migraciones, seeders, Sanctum config), agrégalos en una sección adicional `Backend Setup` aquí.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Comandos básicos (resumen)

```powershell
pnpm install
pnpm dev
pnpm type-check
pnpm lint
pnpm build
```

---

Última actualización: 2025-11-11
