const mongoose = require('mongoose');

const ServicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  duracionMin: { type: Number, default: 30 },
  precio: { type: Number, required: true },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Servicio', ServicioSchema);
