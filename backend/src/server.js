import 'dotenv/config';
import app from './app.js';
import sequelize from './config/database.js';
import './models/Usuario.js';

const PORT = Number(process.env.PORT || 3000);
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Conectado a MySQL mediante Sequelize.');
  app.listen(PORT, () => console.log(`Servidor NICE WORLD corriendo en http://localhost:${PORT}`));
} catch (error) {
  console.error('No se pudo iniciar el backend. Revisa MySQL y las variables del archivo .env.');
  console.error(error.message);
  process.exit(1);
}
