const Servicio = require('../models/Servicio');

exports.listar = async (req, res) => {
  const servicios = await Servicio.find();
  res.json(servicios);
};

exports.crear = async (req, res) => {
  try {
    const { nombre, descripcion, duracionMin, precio } = req.body;
    const s = new Servicio({ nombre, descripcion, duracionMin, precio });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creando servicio' });
  }
};

exports.obtener = async (req, res) => {
  const s = await Servicio.findById(req.params.id);
  if (!s) return res.status(404).json({ msg: 'No encontrado' });
  res.json(s);
};

exports.actualizar = async (req, res) => {
  try {
    const s = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error actualizando' });
  }
};

exports.borrar = async (req, res) => {
  try {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error eliminando' });
  }
};
