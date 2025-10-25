const Cita = require('../models/Cita');

exports.listar = async (req, res) => {
  const citas = await Cita.find().populate('cliente servicio estilista');
  res.json(citas);
};

exports.crear = async (req, res) => {
  try {
    const { cliente, servicio, estilista, fechaHora } = req.body;
    const c = new Cita({ cliente, servicio, estilista, fechaHora });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creando cita' });
  }
};

exports.obtener = async (req, res) => {
  const c = await Cita.findById(req.params.id).populate('cliente servicio estilista');
  if (!c) return res.status(404).json({ msg: 'No encontrado' });
  res.json(c);
};

exports.actualizar = async (req, res) => {
  try {
    const c = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error actualizando' });
  }
};

exports.borrar = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error eliminando' });
  }
};
