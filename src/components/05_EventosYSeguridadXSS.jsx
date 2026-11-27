import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 5] EVENTOS EN JSX Y SEGURIDAD AUTOMÁTICA CONTRA XSS
// ----------------------------------------------------------------------------
// 1. EVENTOS:
//    - En HTML: onclick="saludar()" (cadena de texto).
//    - En JSX:  onClick={saludar}   (referencia a función en camelCase).
//    - Si necesita argumentos: onClick={() => saludar('DAM2')}.
//      ¡ERROR TÍPICO!: escribir onClick={saludar('DAM2')} ejecuta la función
//      inmediatamente al renderizar, no al hacer clic.
// 2. PREVENCIÓN DE XSS (Cross-Site Scripting):
//    - JSX escapa automáticamente cualquier cadena insertada dentro de { }.
//    - Si un atacante introduce `<script>` o `<img onerror=...>`, React lo
//      pinta como texto plano seguro sin ejecutar código JavaScript.
// ============================================================================

export default function EventosYSeguridadXSS() {
  const [ultimoEvento, setUltimoEvento] = useState('Ninguno todavía');
  const [entradaUsuario, setEntradaUsuario] = useState(
    "<img src=x onerror='alert('Ataque XSS')' /> <script>alert('Hack')</script>"
  );

  // Manejador sin parámetros (se pasa como referencia: onClick={manejarClickSimple})
  const manejarClickSimple = () => {
    setUltimoEvento(`Clic simple registrado a las ${new Date().toLocaleTimeString()}`);
  };

  // Manejador con parámetros (requiere función flecha: onClick={() => manejarConParametro(...)})
  const manejarConParametro = (accion) => {
    setUltimoEvento(`Acción ejecutada con parámetro: "${accion}"`);
  };

  return (
    <section className="card">
      <h2>5. Manejo de Eventos y Protección Nativa contra XSS</h2>
      <p className="subtitle">
        Prueba los botones de eventos y comprueba cómo JSX neutraliza automáticamente código HTML/JS malicioso.
      </p>

      <div className="grid-2">
        <div className="box box-success">
          <h3>Sintaxis de Eventos (Synthetic Events)</h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
            Último evento: <strong style={{ color: '#38bdf8' }}>{ultimoEvento}</strong>
          </p>
          <div className="btn-row">
            {/* Referencia directa a la función */}
            <button type="button" className="btn" onClick={manejarClickSimple}>
              onClick=&#123;fn&#125;
            </button>
            {/* Función flecha para pasar argumentos sin ejecutar en el render */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => manejarConParametro('Exportar PDF')}
            >
              onClick=&#123;() =&gt; fn(arg)&#125;
            </button>
          </div>
        </div>

        <div className="box box-warn">
          <h3>Escapado automático contra XSS</h3>
          <label htmlFor="xss-input">Introduce HTML o un payload XSS:</label>
          <input
            id="xss-input"
            type="text"
            className="input"
            value={entradaUsuario}
            onChange={(e) => setEntradaUsuario(e.target.value)}
          />
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.65rem',
              backgroundColor: '#1e293b',
              borderRadius: '8px',
              fontFamily: 'Consolas, monospace',
              fontSize: '0.85rem',
              wordBreak: 'break-all'
            }}
          >
            {/* JSX escapa automáticamente esta cadena: NO se ejecuta el script */}
            Salida renderizada segura: {entradaUsuario}
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/05_EventosYSeguridadXSS.jsx</code>
      </p>
    </section>
  );
}
