const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ msg: 'Faltan datos' });

    const existing = await Usuario.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email ya registrado' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const usuario = new Usuario({ nombre, email, password: hashed });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Faltan datos' });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};
