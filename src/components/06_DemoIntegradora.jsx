import { useEffect, useState } from 'react';
import ResumenKPIs from './ResumenKPIs.jsx';

// ============================================================================
// [CLAVE EXPOSICIÓN 6] DEMO INTEGRADORA DE TODAS LAS CARACTERÍSTICAS DE JSX
// ----------------------------------------------------------------------------
// Este componente reúne en un caso real de aula:
// - Fragmentos (<></>) y atributos camelCase (className, onClick, onChange)
// - Expresiones JS { } y estilos en línea dinámicos style={{ }}
// - Renderizado condicional (ternario + && booleano seguro)
// - Listas con .map() y key única estable
// - Comunicación mediante props y composición de componentes
// ============================================================================

const EXPEDIENTES_INICIALES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

function leerExpedientesGuardados() {
  try {
    const guardados = localStorage.getItem('expedientes-dam2');
    if (!guardados) return { expedientes: EXPEDIENTES_INICIALES, error: '' };

    const expedientes = JSON.parse(guardados);
    if (!Array.isArray(expedientes)) {
      return {
        expedientes: EXPEDIENTES_INICIALES,
        error: 'Los datos guardados no tienen un formato válido; se muestran los datos iniciales.'
      };
    }

    return { expedientes, error: '' };
  } catch {
    return {
      expedientes: EXPEDIENTES_INICIALES,
      error: 'No se pudieron leer los expedientes guardados; se muestran los datos iniciales.'
    };
  }
}

function TarjetaExpediente({ alumno, seleccionado, onSeleccionar }) {
  const aprobado = alumno.nota >= 5;

  return (
    <article
      className="box"
      style={{
        borderColor: seleccionado ? '#38bdf8' : 'var(--border)',
        borderWidth: seleccionado ? '2px' : '1px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{alumno.nombre}</h3>
        <span className={`badge ${aprobado ? 'badge-ok' : 'badge-fail'}`}>
          {aprobado ? `Aprobado (${alumno.nota})` : `Pendiente (${alumno.nota})`}
        </span>
      </div>

      {alumno.modulos.length > 0 && (
        <div className="btn-row" style={{ marginTop: '0.6rem' }}>
          {alumno.modulos.map((mod) => (
            <span key={`${alumno.id}-${mod}`} className="code-inline">
              {mod}
            </span>
          ))}
        </div>
      )}

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => onSeleccionar(alumno)}>
          {seleccionado ? 'Expediente seleccionado' : 'Seleccionar expediente'}
        </button>
      </div>
    </article>
  );
}

export default function DemoIntegradora() {
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');
  const [cargaInicial] = useState(leerExpedientesGuardados);
  const [expedientes, setExpedientes] = useState(cargaInicial.expedientes);
  const [errorGuardado, setErrorGuardado] = useState('');
  const [formulario, setFormulario] = useState({
    nombre: '',
    nota: '',
    modulos: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('expedientes-dam2', JSON.stringify(expedientes));
      setErrorGuardado('');
    } catch {
      setErrorGuardado('No se pudieron guardar los expedientes en este navegador.');
    }
  }, [expedientes]);

  const listaFiltrada = expedientes
    .filter((alumno) => !soloAprobados || alumno.nota >= 5)
    .filter((alumno) =>
      alumno.nombre.toLocaleLowerCase().includes(busqueda.trim().toLocaleLowerCase())
    )
    .sort((a, b) => {
      if (orden === 'nota-asc') return a.nota - b.nota;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
      return b.nota - a.nota;
    });

  const actualizarFormulario = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  };

  const agregarExpediente = (evento) => {
    evento.preventDefault();
    const nombre = formulario.nombre.trim();
    const nota = Number(formulario.nota);
    if (!nombre || formulario.nota === '' || nota < 0 || nota > 10) return;

    const modulos = formulario.modulos
      .split(',')
      .map((modulo) => modulo.trim())
      .filter(Boolean);
    const nuevoId = expedientes.length > 0
      ? Math.max(...expedientes.map((alumno) => Number(alumno.id) || 0)) + 1
      : 1;

    setExpedientes((actual) => [
      ...actual,
      { id: nuevoId, nombre, nota, modulos }
    ]);
    setFormulario({ nombre: '', nota: '', modulos: '' });
  };

  const restablecerDatos = () => {
    try {
      localStorage.removeItem('expedientes-dam2');
      setExpedientes(EXPEDIENTES_INICIALES);
      setSeleccionado(null);
      setErrorGuardado('');
    } catch {
      setErrorGuardado('No se pudo restablecer el almacenamiento local.');
    }
  };

  return (
    <>
      <section className="card">
        <h2>6. Ejemplo Integrador: Panel de Expedientes DAM2</h2>
        <p className="subtitle">
          Composición de componentes reutilizables aplicando todas las reglas de JSX.
        </p>

        <div className="btn-row" style={{ marginBottom: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSoloAprobados((prev) => !prev)}
          >
            {soloAprobados ? 'Mostrar todos los alumnos' : 'Filtrar solo aprobados (>= 5)'}
          </button>

          {seleccionado && (
            <span className="pill">
              Seleccionado: {seleccionado.nombre} (ID #{seleccionado.id})
            </span>
          )}
        </div>

        <form className="box" onSubmit={agregarExpediente} style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Añadir nuevo expediente</h3>
          <div className="grid-2">
            <div>
              <label htmlFor="nombre-expediente">Nombre completo *</label>
              <input
                id="nombre-expediente"
                className="input"
                required
                value={formulario.nombre}
                onChange={(e) => actualizarFormulario('nombre', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="nota-expediente">Nota (0-10) *</label>
              <input
                id="nota-expediente"
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input"
                required
                value={formulario.nota}
                onChange={(e) => actualizarFormulario('nota', e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="modulos-expediente" style={{ display: 'block', marginTop: '0.75rem' }}>
            Módulos (separados por comas)
          </label>
          <input
            id="modulos-expediente"
            className="input"
            placeholder="DI, PSP, AD"
            value={formulario.modulos}
            onChange={(e) => actualizarFormulario('modulos', e.target.value)}
          />
          <div className="btn-row">
            <button type="submit" className="btn">Dar de alta expediente</button>
            <button type="button" className="btn btn-secondary" onClick={restablecerDatos}>
              Restablecer datos iniciales
            </button>
          </div>
        </form>

        <ResumenKPIs alumnos={listaFiltrada} />
        {cargaInicial.error && (
          <p role="alert" className="box box-warn" style={{ marginBottom: '1rem' }}>
            {cargaInicial.error}
          </p>
        )}
        {errorGuardado && (
          <p role="alert" className="box box-warn" style={{ marginBottom: '1rem' }}>
            {errorGuardado}
          </p>
        )}

        <div className="grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <label htmlFor="buscar-expediente">Buscar por nombre:</label>
            <input
              id="buscar-expediente"
              type="search"
              className="input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej.: Lucía"
            />
          </div>
          <div>
            <label htmlFor="orden-expediente">Ordenar por:</label>
            <select
              id="orden-expediente"
              className="input"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="nota-desc">Nota (mayor a menor)</option>
              <option value="nota-asc">Nota (menor a mayor)</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="grid-2">
          {listaFiltrada.length > 0 ? (
            listaFiltrada.map((alumno) => (
              <TarjetaExpediente
                key={alumno.id}
                alumno={alumno}
                seleccionado={seleccionado?.id === alumno.id}
                onSeleccionar={setSeleccionado}
              />
            ))
          ) : (
            <p className="box box-warn" style={{ gridColumn: '1 / -1' }}>
              No se encontraron expedientes con esos criterios
            </p>
          )}
        </div>

        <p className="file-hint">
          Archivo para mostrar en VS Code: <code className="code-inline">src/components/06_DemoIntegradora.jsx</code>
        </p>
      </section>
    </>
  );
}
