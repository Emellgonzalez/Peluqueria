const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin','empleado','cliente'], default: 'cliente' },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
