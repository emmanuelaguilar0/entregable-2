import * as service from '../services/usuario.service.js';
export async function obtenerUsuarios(req, res, next) {
  try { res.json({ datos: await service.listarUsuarios() }); } catch (err) { next(err); }
}
export async function obtenerUsuario(req, res, next) {
  try { const usuario = await service.buscarUsuario(Number(req.params.id)); if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' }); res.json({ datos: usuario }); } catch (err) { next(err); }
}
export async function crear(req, res, next) {
  try { const usuario = await service.crearUsuario(req.body); res.status(201).json({ mensaje: 'Usuario creado.', datos: usuario }); } catch (err) { next(err); }
}
export async function actualizar(req, res, next) {
  try { const usuario = await service.actualizarUsuario(Number(req.params.id), req.body); if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' }); res.json({ mensaje: 'Usuario actualizado.', datos: usuario }); } catch (err) { next(err); }
}
export async function eliminar(req, res, next) {
  try { const eliminado = await service.eliminarUsuario(Number(req.params.id)); if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado.' }); res.status(204).send(); } catch (err) { next(err); }
}
