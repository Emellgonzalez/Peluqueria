const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  estilista: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fechaHora: { type: Date, required: true },
  estado: { type: String, enum: ['pendiente','confirmada','cancelada','finalizada'], default: 'pendiente' },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cita', CitaSchema);
