import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ============================================================================
// [CLAVE EXPOSICIÓN] Punto de arranque de React 18:
// 1. Localizamos el <div id="root"> definido en index.html.
// 2. Renderizamos nuestro componente raíz <App /> escrito en JSX.
// 3. Fíjate en que NO hace falta escribir `import React from 'react'` gracias
//    al Automatic JSX Transform introducido desde React 17+.
// ============================================================================
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
