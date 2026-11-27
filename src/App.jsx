import { useEffect, useState } from 'react';

// [CLAVE EXPOSICIÓN] Importación de componentes React.
// Observa que TODOS los componentes propios empiezan por MAYÚSCULA.
// Si empezaran por minúscula, JSX los interpretaría como etiquetas HTML nativas.
import SintaxisYFragmentos from './components/01_SintaxisYFragmentos.jsx';
import ExpresionesYEstilos from './components/02_ExpresionesYEstilos.jsx';
import RenderizadoCondicional from './components/03_RenderizadoCondicional.jsx';
import ListasYKeys from './components/04_ListasYKeys.jsx';
import EventosYSeguridadXSS from './components/05_EventosYSeguridadXSS.jsx';
import DemoIntegradora from './components/06_DemoIntegradora.jsx';

const SECCIONES = [
  { id: '01', titulo: '1. Sintaxis y Fragmentos', componente: SintaxisYFragmentos },
  { id: '02', titulo: '2. Expresiones y Estilos', componente: ExpresionesYEstilos },
  { id: '03', titulo: '3. Condicionales (y el 0)', componente: RenderizadoCondicional },
  { id: '04', titulo: '4. Listas y Keys', componente: ListasYKeys },
  { id: '05', titulo: '5. Eventos y XSS', componente: EventosYSeguridadXSS },
  { id: '06', titulo: '6. Demo Integradora', componente: DemoIntegradora }
];

export default function App() {
  const [activa, setActiva] = useState('01');
  const [temaOscuro, setTemaOscuro] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('theme-claro', !temaOscuro);
    document.body.classList.toggle('theme-oscuro', temaOscuro);
    return () => {
      document.body.classList.remove('theme-claro', 'theme-oscuro');
    };
  }, [temaOscuro]);

  // Localizamos dinámicamente el componente a renderizar según la pestaña activa
  const seccionActual = SECCIONES.find((sec) => sec.id === activa);
  const ComponenteActivo = seccionActual.componente;

  return (
    <div className={`layout ${temaOscuro ? 'tema-oscuro' : 'tema-claro'}`}>
      <header className="header">
        <div>
          <h1>M10.2. JSX (JavaScript XML) con React</h1>
          <p>Demostración interactiva para exposición en clase · Abre los archivos de src/components/ en VS Code</p>
        </div>
        <div className="header-actions">
          <span className="pill">React 18 + Vite</span>
          <button
            type="button"
            className="btn"
            onClick={() => setTemaOscuro((actual) => !actual)}
          >
            {temaOscuro ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
      </header>

      {/* Navegación generada dinámicamente con .map() y key única */}
      <nav className="tabs" aria-label="Temas de JSX">
        {SECCIONES.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className={`tab-btn ${activa === sec.id ? 'active' : ''}`}
            onClick={() => setActiva(sec.id)}
          >
            {sec.titulo}
          </button>
        ))}
      </nav>

      {/* Renderizamos el componente seleccionado */}
      <main>
        <ComponenteActivo />
      </main>

      <footer className="footer">
        Ignacio Bobes Elso · M10.2 JSX · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
