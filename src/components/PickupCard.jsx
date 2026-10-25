function PickupCard({ horario }) {
  return (
    <article className="pickup-card">
      <div className="card-number">0{horario.id}</div>
      <div>
        <span className="card-label">{horario.tipo}</span>
        <h3>{horario.dia}</h3>
        <p>{horario.hora}</p>
        <small>{horario.sector}</small>
      </div>
    </article>
  );
}

export default PickupCard;