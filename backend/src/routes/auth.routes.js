import { Router } from 'express';
import { iniciarSesion, registrar } from '../controllers/auth.controller.js';
import { validarLogin, validarRegistro } from '../middlewares/validaciones.js';
const router = Router();
router.post('/register', validarRegistro, registrar);
router.post('/login', validarLogin, iniciarSesion);
export default router;
