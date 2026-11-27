import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ============================================================================
// EXPOSICIÓN: ¿Cómo entiende el navegador el código JSX?
// El navegador NO entiende JSX de forma nativa.
// Vite utiliza @vitejs/plugin-react (basado en esbuild/Babel) para transpilar
// automáticamente cada archivo .jsx a JavaScript estándar en milisegundos.
// ============================================================================
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true // Abre automáticamente el navegador al ejecutar `npm run dev`
  }
});
