export function validarRegistro(req, res, next) {
  const { nombre, correo, password } = req.body || {};
  const errores = [];
  if (typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.trim().length > 100) errores.push('El nombre debe tener entre 2 y 100 caracteres.');
  if (typeof correo !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.push('Ingresa un correo electrónico válido.');
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) errores.push('La contraseña debe tener entre 8 y 72 caracteres.');
  if (errores.length) return res.status(400).json({ mensaje: 'Datos inválidos.', errores });
  next();
}
export function validarLogin(req, res, next) {
  const { correo, password } = req.body || {};
  if (typeof correo !== 'string' || !correo.trim() || typeof password !== 'string' || !password) return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
  next();
}
export function validarActualizacion(req, res, next) {
  const { nombre, correo, password } = req.body || {};
  const errores = [];
  if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.trim().length > 100)) errores.push('El nombre debe tener entre 2 y 100 caracteres.');
  if (correo !== undefined && (typeof correo !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim()))) errores.push('Ingresa un correo electrónico válido.');
  if (password !== undefined && (typeof password !== 'string' || password.length < 8 || password.length > 72)) errores.push('La contraseña debe tener entre 8 y 72 caracteres.');
  if (!nombre && !correo && !password) errores.push('Debes enviar al menos un campo para actualizar.');
  if (errores.length) return res.status(400).json({ mensaje: 'Datos inválidos.', errores });
  next();
}
export function validarId(req, res, next) {
  if (!/^\d+$/.test(req.params.id) || Number(req.params.id) < 1) return res.status(400).json({ mensaje: 'El ID debe ser un número entero positivo.' });
  next();
}
export function manejarErrores(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ mensaje: 'Este correo ya está registrado.' });
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeDatabaseError' && err.original?.code === 'ER_DATA_TOO_LONG') return res.status(400).json({ mensaje: 'Los datos enviados no son válidos.' });
  console.error(err);
  return res.status(500).json({ mensaje: 'Error interno del servidor.' });
}
