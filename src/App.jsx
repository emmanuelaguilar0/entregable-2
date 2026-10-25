import { useState } from "react";
import MainApp from "./MainApp.jsx";
import "./auth.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ nombre: "", correo: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || "No se pudo completar la solicitud.");
      onAuthenticated(data.usuario, data.token);
    } catch (error) {
      setMensaje(error.message || "No fue posible conectar con el servidor. Verifica que el backend esté iniciado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand"><span>♻</span> A Nice World</div>
        <div className="auth-message">
          <span className="tag">UNA CIUDAD MÁS LIMPIA COMIENZA CONTIGO</span>
          <h1>Pequeñas acciones.<br /><span>Un mundo mejor.</span></h1>
          <p>Consulta horarios de recolección, mantente informado y aprende a separar tus residuos.</p>
          <div className="auth-leaf">♻</div>
        </div>
        <small>Gestión inteligente y responsable de residuos.</small>
      </section>
      <section className="auth-form-side">
        <form className="auth-form" onSubmit={submit}>
          <span className="auth-eyebrow">BIENVENIDO A NICE WORLD</span>
          <h2>{mode === "login" ? "Iniciar sesión" : "Crear una cuenta"}</h2>
          <p className="auth-subtitle">{mode === "login" ? "Ingresa tus datos para continuar." : "Regístrate para empezar a cuidar tu entorno."}</p>
          {mode === "register" && <label>Nombre completo<input name="nombre" value={form.nombre} onChange={update} placeholder="Tu nombre" autoComplete="name" required minLength={2} /></label>}
          <label>Correo electrónico<input name="correo" type="email" value={form.correo} onChange={update} placeholder="correo@ejemplo.com" autoComplete="email" required /></label>
          <label>Contraseña<input name="password" type="password" value={form.password} onChange={update} placeholder="Mínimo 8 caracteres" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={8} /></label>
          {mensaje && <div className="auth-error" role="alert">{mensaje}</div>}
          <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Registrarme"}</button>
          <div className="auth-switch">
            {mode === "login" ? "¿Todavía no tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
            <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setMensaje(""); }}>
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </div>
          <p className="auth-privacy">Tus datos se utilizan para acceder a tu cuenta de A Nice World.</p>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("niceWorldSession")) || null; }
    catch { return null; }
  });

  function login(usuario, token) {
    const next = { usuario, token };
    localStorage.setItem("niceWorldSession", JSON.stringify(next));
    setSession(next);
  }

  if (!session?.token) return <AuthScreen onAuthenticated={login} />;
  return <div className="signed-in-shell">
    <div className="session-bar"><span>Sesión iniciada: <strong>{session.usuario.nombre}</strong></span><button onClick={() => { localStorage.removeItem("niceWorldSession"); setSession(null); }}>Cerrar sesión</button></div>
    <MainApp />
  </div>;
}
