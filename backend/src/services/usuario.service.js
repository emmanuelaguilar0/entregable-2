import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

export async function listarUsuarios() { return Usuario.findAll({ order: [['id', 'ASC']] }); }
export async function buscarUsuario(id) { return Usuario.findByPk(id); }
export async function crearUsuario({ nombre, correo, password }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return Usuario.create({ nombre: nombre.trim(), correo: correo.trim().toLowerCase(), passwordHash });
}
export async function actualizarUsuario(id, datos) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  const cambios = {};
  if (datos.nombre !== undefined) cambios.nombre = datos.nombre.trim();
  if (datos.correo !== undefined) cambios.correo = datos.correo.trim().toLowerCase();
  if (datos.password) cambios.passwordHash = await bcrypt.hash(datos.password, 12);
  await usuario.update(cambios);
  return Usuario.findByPk(id);
}
export async function eliminarUsuario(id) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return false;
  await usuario.destroy();
  return true;
}
export async function buscarPorCorreo(correo) {
  return Usuario.unscoped().findOne({ where: { correo: correo.trim().toLowerCase() } });
}
export async function verificarPassword(usuario, password) { return bcrypt.compare(password, usuario.passwordHash); }
