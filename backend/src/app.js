import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import { manejarErrores } from './middlewares/validaciones.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (req, res) => res.json({ estado: 'ok', mensaje: 'API NICE WORLD funcionando.' }));
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use((req, res) => res.status(404).json({ mensaje: 'Endpoint no encontrado.' }));
app.use(manejarErrores);
export default app;
