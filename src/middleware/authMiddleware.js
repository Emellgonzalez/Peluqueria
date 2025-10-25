const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ','') || req.query.token;
  if (!token) return res.status(401).json({ msg: 'No token, autorización denegada' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) return res.status(401).json({ msg: 'Usuario no encontrado' });
    req.usuario = usuario;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token inválido' });
  }
};
