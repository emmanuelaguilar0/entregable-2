function NotificationCard({ notificacion }) {
  return (
    <article className="notification-card">
      <div className="notification-icon">!</div>
      <div>
        <strong>{notificacion.titulo}</strong>
        <p>{notificacion.mensaje}</p>
        <small>{notificacion.hora}</small>
      </div>
    </article>
  );
}

export default NotificationCard;