function RecyclingCard({ residuo, seleccionado, onSelect }) {
  return (
    <button className={`recycling-card ${seleccionado ? "selected" : ""}`} onClick={onSelect}>
      <div className="recycling-symbol">♻</div>
      <div>
        <span className="card-label">RESIDUO</span>
        <h3>{residuo.nombre}</h3>
        <p>Contenedor: {residuo.color}</p>
      </div>
    </button>
  );
}

export default RecyclingCard;