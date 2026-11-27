// ============================================================================
// [CLAVE EXPOSICIÓN 1] REGLAS SINTÁCTICAS FUNDAMENTALES DE JSX
// ----------------------------------------------------------------------------
// 1. UN SOLO ELEMENTO RAÍZ: Un componente debe devolver un único nodo padre.
//    Para evitar <div> innecesarios en el DOM, usamos Fragmentos: <> ... </>
// 2. CIERRE OBLIGATORIO: Etiquetas vacías como <input />, <br />, <hr />
//    SIEMPRE deben cerrarse con `/`.
// 3. PALABRAS RESERVADAS DE JS:
//    - En HTML: class="..."   -> En JSX: className="..."
//    - En HTML: for="..."     -> En JSX: htmlFor="..."
// 4. MAYÚSCULAS VS MINÚSCULAS:
//    - <button> (minúscula)   -> Etiqueta HTML nativa
//    - <EtiquetaInfo /> (May) -> Componente personalizado de React
// ============================================================================

// Pequeño componente auxiliar (obligatoriamente empieza en MAYÚSCULA)
function EtiquetaInfo({ texto }) {
  return <span className="pill">{texto}</span>;
}

export default function SintaxisYFragmentos() {
  // Este bloque demuestra el uso de Fragment (<>...</>):
  // Si inspeccionas el DOM en el navegador (F12), verás que el Fragment
  // NO crea ningún <div> extra envolviendo las tarjetas.
  return (
    <>
      <section className="card">
        <h2>1. Reglas Sintácticas y Fragmentos (&lt;&gt;...&lt;/&gt;)</h2>
        <p className="subtitle">
          JSX parece HTML, pero se compila a llamadas de JavaScript (<code className="code-inline">_jsx()</code>).
          Por eso es más estricto que HTML5.
        </p>

        <div className="grid-2">
          <div className="box box-success">
            <h3>Atributos adaptados a JavaScript</h3>
            {/* Comentario en JSX: siempre entre llaves y sintaxis de bloque JS */}
            <label htmlFor="campo-alumno">
              Nombre del alumno (<code className="code-inline">htmlFor</code> en lugar de <code className="code-inline">for</code>):
            </label>
            {/* Etiqueta autocerrada obligatoria con "/" al final */}
            <input
              id="campo-alumno"
              type="text"
              className="input"
              placeholder="Ej.: Elena Martínez"
              readOnly={false}
            />
          </div>

          <div className="box box-warn">
            <h3>Componentes en Mayúscula vs. HTML</h3>
            <p style={{ marginBottom: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              Abajo renderizamos un componente propio <code className="code-inline">&lt;EtiquetaInfo /&gt;</code>:
            </p>
            <EtiquetaInfo texto="Componente con inicial Mayúscula" />
            <br />
            <br />
            <small style={{ color: '#94a3b8' }}>
              Nota: los saltos de línea anteriores usan <code className="code-inline">&lt;br /&gt;</code> cerrado.
            </small>
          </div>
        </div>

        <p className="file-hint">
          Archivo para mostrar en VS Code: <code className="code-inline">src/components/01_SintaxisYFragmentos.jsx</code>
        </p>
      </section>
    </>
  );
}


