function Navbar({ seccion, onNavigate }) {
  return (
    <header className="navbar">
      <button className="logo" onClick={() => onNavigate("inicio")}>
        <span>♻</span> A Nice World
      </button>

      <nav>
        <button className={seccion === "inicio" ? "active" : ""} onClick={() => onNavigate("inicio")}>
          Inicio
        </button>
        <button className={seccion === "horarios" ? "active" : ""} onClick={() => onNavigate("horarios")}>
          Horarios
        </button>
        <button className={seccion === "reciclaje" ? "active" : ""} onClick={() => onNavigate("reciclaje")}>
          Reciclaje
        </button>
        <button className={seccion === "notificaciones" ? "active" : ""} onClick={() => onNavigate("notificaciones")}>
          Notificaciones
        </button>
      </nav>
    </header>
  );
}

export default Navbar;