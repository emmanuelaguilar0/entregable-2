import jwt from 'jsonwebtoken';
export function autenticar(req, res, next) {
  const encabezado = req.headers.authorization || '';
  const token = encabezado.startsWith('Bearer ') ? encabezado.slice(7) : '';
  if (!token) return res.status(401).json({ mensaje: 'Debes iniciar sesión para acceder a este recurso.' });
  try {
    req.usuarioAuth = jwt.verify(token, process.env.JWT_SECRET || 'solo-desarrollo-cambia-esta-clave');
    next();
  } catch {
    return res.status(401).json({ mensaje: 'La sesión no es válida o ha expirado.' });
  }
}
