import { useState } from "react";
import datos from "./data/datos.json";
import Navbar from "./components/Navbar.jsx";
import PickupCard from "./components/PickupCard.jsx";
import RecyclingCard from "./components/RecyclingCard.jsx";
import NotificationCard from "./components/NotificationCard.jsx";

function MainApp() {
  const [seccion, setSeccion] = useState("inicio");
  const [residuoSeleccionado, setResiduoSeleccionado] = useState(null);
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);

  const mostrarSeccion = (nombre) => {
    setSeccion(nombre);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Navbar seccion={seccion} onNavigate={mostrarSeccion} />

      <main>
        {seccion === "inicio" && (
          <>
            <section className="hero">
              <div className="hero-text">
                <span className="tag">GESTIÓN INTELIGENTE DE RESIDUOS</span>
                <h1>Cuida tu ciudad.<br /><span>Gestiona mejor tus residuos.</span></h1>
                <p>
                  Consulta los horarios de recolección, conoce el estado del servicio
                  y aprende a separar correctamente tus residuos.
                </p>
                <div className="hero-buttons">
                  <button className="btn primary" onClick={() => mostrarSeccion("horarios")}>
                    Ver horarios
                  </button>
                  <button className="btn secondary" onClick={() => mostrarSeccion("reciclaje")}>
                    Aprender a reciclar
                  </button>
                </div>
              </div>

              <div className="hero-card">
                <div className="truck-icon">♻</div>
                <h3>Próxima recolección</h3>
                <strong>{datos.horarios[0].dia}</strong>
                <p>{datos.horarios[0].hora} · {datos.horarios[0].tipo}</p>
                <div className="status"><span></span> Servicio programado</div>
              </div>
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="tag">INFORMACIÓN</span>
                  <h2>Todo en un solo lugar</h2>
                </div>
                <p>Funciones principales de A Nice World.</p>
              </div>

              <div className="feature-grid">
                <button className="feature" onClick={() => mostrarSeccion("horarios")}>
                  <span className="feature-icon">◷</span>
                  <h3>Horarios</h3>
                  <p>Consulta cuándo pasará el camión por tu sector.</p>
                </button>

                <button className="feature" onClick={() => mostrarSeccion("reciclaje")}>
                  <span className="feature-icon">♻</span>
                  <h3>Reciclaje</h3>
                  <p>Aprende cómo clasificar diferentes tipos de residuos.</p>
                </button>

                <button className="feature" onClick={() => mostrarSeccion("notificaciones")}>
                  <span className="feature-icon">♢</span>
                  <h3>Notificaciones</h3>
                  <p>Consulta avisos importantes sobre el servicio.</p>
                </button>
              </div>
            </section>
          </>
        )}

        {seccion === "horarios" && (
          <section className="page-section">
            <span className="tag">RECOLECCIÓN</span>
            <h1>Horarios de recolección</h1>
            <p className="page-intro">
              Consulta los días y horarios programados para cada tipo de residuo.
            </p>

            <div className="cards-grid">
              {datos.horarios.map((horario) => (
                <PickupCard key={horario.id} horario={horario} />
              ))}
            </div>
          </section>
        )}

        {seccion === "reciclaje" && (
          <section className="page-section">
            <span className="tag">EDUCACIÓN AMBIENTAL</span>
            <h1>Aprende a reciclar</h1>
            <p className="page-intro">
              Selecciona un tipo de residuo para conocer cómo clasificarlo.
            </p>

            <div className="cards-grid">
              {datos.residuos.map((residuo) => (
                <RecyclingCard
                  key={residuo.id}
                  residuo={residuo}
                  seleccionado={residuoSeleccionado?.id === residuo.id}
                  onSelect={() => setResiduoSeleccionado(residuo)}
                />
              ))}
            </div>

            {residuoSeleccionado && (
              <div className="info-panel">
                <h2>{residuoSeleccionado.nombre}</h2>
                <p><strong>Contenedor:</strong> {residuoSeleccionado.color}</p>
                <p>{residuoSeleccionado.descripcion}</p>
              </div>
            )}
          </section>
        )}

        {seccion === "notificaciones" && (
          <section className="page-section">
            <span className="tag">AVISOS</span>
            <h1>Notificaciones</h1>
            <p className="page-intro">
              Mantente informado sobre la recolección y el reciclaje.
            </p>

            <div className="notification-control">
              <div>
                <strong>Notificaciones activas</strong>
                <p>Activa o desactiva los avisos simulados.</p>
              </div>
              <button
                className={`toggle ${notificacionesActivas ? "active" : ""}`}
                onClick={() => setNotificacionesActivas(!notificacionesActivas)}
              >
                <span></span>
              </button>
            </div>

            {notificacionesActivas ? (
              <div className="notification-list">
                {datos.notificaciones.map((notificacion) => (
                  <NotificationCard
                    key={notificacion.id}
                    notificacion={notificacion}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                Las notificaciones están desactivadas.
              </div>
            )}
          </section>
        )}
      </main>

      <footer>
        <div>
          <strong>A Nice World</strong>
          <p>Gestión inteligente y responsable de residuos.</p>
        </div>
        <span>Proyecto académico · React + Vite</span>
      </footer>
    </div>
  );
}

export default MainApp;