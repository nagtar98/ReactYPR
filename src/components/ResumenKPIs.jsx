export default function ResumenKPIs({ alumnos }) {
  const total = alumnos.length;
  const notaMedia = total > 0
    ? alumnos.reduce((suma, alumno) => suma + alumno.nota, 0) / total
    : 0;
  const aprobados = total > 0
    ? (alumnos.filter((alumno) => alumno.nota >= 5).length / total) * 100
    : 0;

  return (
    <div className="kpi-grid" aria-label="Resumen de indicadores">
      <div className="kpi-card">
        <span>Total de alumnos</span>
        <strong>{total}</strong>
      </div>
      <div className="kpi-card">
        <span>Nota media del grupo</span>
        <strong>{notaMedia.toFixed(2)}</strong>
      </div>
      <div className="kpi-card">
        <span>Porcentaje de aprobados</span>
        <strong>{aprobados.toFixed(0)}%</strong>
      </div>
    </div>
  );
}
