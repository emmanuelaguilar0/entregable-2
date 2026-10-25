import jwt from 'jsonwebtoken';
import { buscarPorCorreo, crearUsuario, verificarPassword } from '../services/usuario.service.js';

function tokenPara(usuario) {
  return jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET || 'solo-desarrollo-cambia-esta-clave', { expiresIn: '8h' });
}
export async function registrar(req, res, next) {
  try {
    const correo = req.body.correo.trim().toLowerCase();
    if (await buscarPorCorreo(correo)) return res.status(409).json({ mensaje: 'Este correo ya está registrado. Inicia sesión.' });
    const usuario = await crearUsuario({ ...req.body, correo });
    return res.status(201).json({ mensaje: 'Cuenta creada correctamente.', usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }, token: tokenPara(usuario) });
  } catch (err) { next(err); }
}
export async function iniciarSesion(req, res, next) {
  try {
    const usuario = await buscarPorCorreo(req.body.correo);
    if (!usuario || !(await verificarPassword(usuario, req.body.password))) return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    return res.json({ mensaje: 'Sesión iniciada correctamente.', usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }, token: tokenPara(usuario) });
  } catch (err) { next(err); }
}
