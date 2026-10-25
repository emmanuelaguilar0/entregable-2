import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true, len: [2, 100] } },
  correo: { type: DataTypes.STRING(150), allowNull: false, unique: { name: 'usuarios_correo_unique', msg: 'Este correo ya está registrado.' }, validate: { isEmail: true, notEmpty: true } },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false, field: 'password_hash' },
}, { tableName: 'usuarios', timestamps: true, defaultScope: { attributes: { exclude: ['passwordHash'] } }, scopes: { conPassword: { attributes: { include: ['passwordHash'] } } } });
export default Usuario;
