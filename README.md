# M10.2. JSX con React — Proyecto de Demostración para el Aula

**Autor:** Ignacio Bobes Elso  
**Módulo:** M10.2 JSX con React  
**Aplicación desplegada:** Pendiente de publicar en Vercel  
**Repositorio:** https://github.com/nagtar98/ReactYPR

Proyecto educativo en **React 18 + Vite** diseñado para explicar paso a paso todas las características de **JSX (JavaScript XML)** directamente desde Visual Studio Code.

La aplicación incluye validación reactiva, una calculadora fiscal, búsqueda y ordenación de registros, altas de expedientes, indicadores académicos y persistencia local.

## Puesta en marcha rápida (3 pasos)

1. Abre esta carpeta en **Visual Studio Code**.
2. Abre una terminal integrada (`Ctrl + ñ` o `Ctrl + \``) y ejecuta:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Se abrirá automáticamente en `http://localhost:5173`.

## Guion sugerido para la exposición en clase

Cada pestaña de la aplicación corresponde a un archivo numerado dentro de `src/components/`, con comentarios guiados (`[CLAVE EXPOSICIÓN]`):

1. `01_SintaxisYFragmentos.jsx` — Nodo raíz único, Fragmentos (`<>...</>`), cierre obligatorio, `className`, `htmlFor` y componentes en Mayúscula.
2. `02_ExpresionesYEstilos.jsx` — Llaves `{ }` (expresiones vs. sentencias), estilos en línea `style={{ }}` en `camelCase` y valores ignorados por React.
3. `03_RenderizadoCondicional.jsx` — *Early return*, operador ternario (`? :`), operador `&&` y demostración en vivo de la **trampa del `0`**.
4. `04_ListasYKeys.jsx` — Transformación de arrays con `.map()` y la importancia real de la prop `key` en el algoritmo de reconciliación.
5. `05_EventosYSeguridadXSS.jsx` — Eventos `onClick={fn}` vs. `onClick={() => fn(arg)}` y demostración práctica de protección automática contra **XSS**.
6. `06_DemoIntegradora.jsx` — Ejemplo completo integrando todas las reglas de JSX en un mini-panel de módulos.
