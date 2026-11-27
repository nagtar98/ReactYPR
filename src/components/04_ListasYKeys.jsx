import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 4] RENDERIZADO DE LISTAS CON .map() Y LA PROP `key`
// ----------------------------------------------------------------------------
// 1. En JSX no se usan bucles `for`; se transforman arrays con `.map()`.
// 2. Cada elemento raíz devuelto dentro de `.map()` DEBE llevar una prop `key`
//    única y estable entre renderizados (normalmente un `id` de BD o UUID).
// 3. ¿POR QUÉ NO USAR EL ÍNDICE DEL ARRAY (`index`) COMO `key`?
//    Si reordenas, filtras o eliminas el primer elemento, todos los índices
//    cambian y React confunde el estado interno de cada fila (por ejemplo,
//    el texto escrito en un <input> o un checkbox marcado).
// ============================================================================

const MODULOS_INICIALES = [
  { id: 'di-01', codigo: 'DI', nombre: 'Desarrollo de Interfaces', horas: 120 },
  { id: 'psp-02', codigo: 'PSP', nombre: 'Programación de Servicios y Procesos', horas: 90 },
  { id: 'ad-03', codigo: 'AD', nombre: 'Acceso a Datos', horas: 120 }
];

export default function ListasYKeys() {
  const [modulos, setModulos] = useState(MODULOS_INICIALES);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [errorDuplicado, setErrorDuplicado] = useState('');

  const agregarModulo = (e) => {
    e.preventDefault();
    const nombre = nuevoNombre.trim();
    if (!nombre) return;

    const existe = modulos.some(
      (modulo) => modulo.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase()
    );
    if (existe) {
      setErrorDuplicado(`El módulo "${nombre}" ya existe en la lista.`);
      return;
    }
    setErrorDuplicado('');

    const nuevo = {
      id: `mod-${Date.now()}`, // ID único estable (mejor que usar el índice del array)
      codigo: 'OPT',
      nombre,
      horas: 60
    };
    // Insertamos al principio para demostrar que React conserva la identidad de cada fila
    setModulos([nuevo, ...modulos]);
    setNuevoNombre('');
  };

  const modulosFiltrados = modulos.filter((modulo) => {
    const texto = busqueda.trim().toLocaleLowerCase();
    return (
      modulo.nombre.toLocaleLowerCase().includes(texto) ||
      modulo.codigo.toLocaleLowerCase().includes(texto)
    );
  });

  const eliminarModulo = (idAEliminar) => {
    setModulos(modulos.filter((m) => m.id !== idAEliminar));
  };

  const invertirOrden = () => {
    setModulos([...modulos].reverse());
  };

  return (
    <section className="card">
      <h2>4. Listas Dinámicas con .map() y la prop key</h2>
      <p className="subtitle">
        Cada elemento de la lista utiliza <code className="code-inline">key=&#123;modulo.id&#125;</code> para
        que el algoritmo de reconciliación (Virtual DOM) identifique cambios con precisión.
      </p>

      <form onSubmit={agregarModulo} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="input"
          style={{ flex: '1 1 260px', marginTop: 0 }}
          placeholder="Añadir nuevo módulo al principio de la lista..."
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <button type="submit" className="btn">Añadir módulo</button>
        <button type="button" className="btn btn-secondary" onClick={invertirOrden}>
          Invertir orden
        </button>
      </form>
      {errorDuplicado && (
        <p role="alert" style={{ color: '#ef4444', marginTop: '0.75rem' }}>
          {errorDuplicado}
        </p>
      )}

      <label htmlFor="buscar-modulo" style={{ display: 'block', marginTop: '1rem' }}>
        Buscar módulos:
      </label>
      <input
        id="buscar-modulo"
        type="search"
        className="input"
        placeholder="Nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <p style={{ margin: '0.75rem 0' }}>
        Mostrando {modulosFiltrados.length} de {modulos.length} módulos
      </p>

      <ul className="list">
        {modulosFiltrados.map((modulo) => (
          // [CLAVE EXPOSICIÓN] La `key` va siempre en el elemento raíz del `.map()`
          <li key={modulo.id} className="list-item">
            <div>
              <span className="pill" style={{ marginRight: '0.6rem' }}>{modulo.codigo}</span>
              <strong>{modulo.nombre}</strong>
              <span style={{ color: 'var(--muted)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                ({modulo.horas} h · key: <code className="code-inline">{modulo.id}</code>)
              </span>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => eliminarModulo(modulo.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {modulos.length === 0 && (
        <p className="subtitle" style={{ marginTop: '0.75rem' }}>
          No quedan módulos en la lista. Añade uno nuevo arriba.
        </p>
      )}

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/04_ListasYKeys.jsx</code>
      </p>
    </section>
  );
}
