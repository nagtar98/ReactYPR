import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 2] EXPRESIONES JAVASCRIPT { } Y ESTILOS EN LÍNEA
// ----------------------------------------------------------------------------
// 1. Dentro de { } solo caben EXPRESIONES (algo que produce un valor):
//    variables, cálculos, llamadas a funciones, template literals, ternarios.
// 2. NO caben SENTENCIAS (if, for, while, switch). Esas se resuelven fuera
//    del `return` o con expresiones equivalentes.
// 3. `style={{ ... }}` lleva DOBLE LLAVE:
//    - Llave exterior: abre expresión JSX.
//    - Llave interior: define un objeto literal de JavaScript.
//    - Propiedades CSS en camelCase: `backgroundColor`, `fontSize`, `borderRadius`.
// 4. React IGNORA en pantalla: true, false, null y undefined.
// ============================================================================

const formatearEuros = (cantidad) => `${cantidad.toFixed(2)} €`;

export default function ExpresionesYEstilos() {
  const [precioBase, setPrecioBase] = useState(100);
  const [colorDestacado, setColorDestacado] = useState('#38bdf8');
  const [tipoIva, setTipoIva] = useState(21);
  const [descuento, setDescuento] = useState(0);

  const descuentoSeguro = Math.min(50, Math.max(0, descuento));
  const importeDescontado = precioBase * (descuentoSeguro / 100);
  const baseImponible = precioBase - importeDescontado;
  const cuotaIva = baseImponible * (tipoIva / 100);
  const totalFinal = baseImponible + cuotaIva;

  // Objeto de estilos dinámico en JavaScript
  const estiloTarjetaDinamica = {
    backgroundColor: 'var(--surface-alt)',
    border: `2px solid ${colorDestacado}`,
    borderRadius: '10px',
    padding: '1rem',
    transition: 'border-color 0.2s ease'
  };

  return (
    <section className="card">
      <h2>2. Expresiones JavaScript &#123; &#125; y Estilos en Línea</h2>
      <p className="subtitle">
        Las llaves son una ventana directa a JavaScript dentro del marcado JSX.
      </p>

      <div className="grid-2">
        <div className="box">
          <h3>Expresiones evaluadas en tiempo real</h3>
          <label htmlFor="precio-input">Precio base (€):</label>
          <input
            id="precio-input"
            type="number"
            className="input"
            value={precioBase}
            onChange={(e) => setPrecioBase(Number(e.target.value) || 0)}
          />

          <label htmlFor="iva-select" style={{ display: 'block', marginTop: '0.75rem' }}>
            Tipo de IVA:
          </label>
          <select
            id="iva-select"
            className="input"
            value={tipoIva}
            onChange={(e) => setTipoIva(Number(e.target.value))}
          >
            <option value={21}>General (21%)</option>
            <option value={10}>Reducido (10%)</option>
            <option value={4}>Superreducido (4%)</option>
          </select>

          <label htmlFor="descuento-input" style={{ display: 'block', marginTop: '0.75rem' }}>
            Descuento (%):
          </label>
          <input
            id="descuento-input"
            type="number"
            min="0"
            max="50"
            className="input"
            value={descuento}
            onChange={(e) => setDescuento(Number(e.target.value) || 0)}
          />

          <ul className="list">
            <li className="list-item">
              <span>Precio Base</span>
              <strong>{formatearEuros(precioBase)}</strong>
            </li>
            <li className="list-item">
              <span>Importe Descontado</span>
              <strong>{formatearEuros(importeDescontado)}</strong>
            </li>
            <li className="list-item">
              <span>Base Imponible</span>
              <strong>{formatearEuros(baseImponible)}</strong>
            </li>
            <li className="list-item">
              <span>Cuota de IVA</span>
              <strong>{formatearEuros(cuotaIva)}</strong>
            </li>
            <li className="list-item" style={descuentoSeguro > 0 ? { borderColor: '#10b981' } : undefined}>
              <span>Total Final</span>
              <strong style={descuentoSeguro > 0 ? { color: '#10b981' } : undefined}>
                {formatearEuros(totalFinal)}
              </strong>
            </li>
          </ul>
        </div>

        <div style={estiloTarjetaDinamica}>
          <h3 style={{ color: colorDestacado, marginTop: 0 }}>
            Estilos en línea con style=&#123;&#123; camelCase &#125;&#125;
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text)' }}>
            El borde y el título de este recuadro se calculan dinámicamente desde un objeto
            JavaScript usando <code className="code-inline">border</code> y <code className="code-inline">color</code>.
          </p>

          <div className="btn-row">
            <button type="button" className="btn" onClick={() => setColorDestacado('#38bdf8')}>
              Azul Cyan
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#059669' }} onClick={() => setColorDestacado('#10b981')}>
              Verde Esmeralda
            </button>
            <button type="button" className="btn" style={{ backgroundColor: '#d97706' }} onClick={() => setColorDestacado('#f59e0b')}>
              Ámbar
            </button>
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/02_ExpresionesYEstilos.jsx</code>
      </p>
    </section>
  );
}
