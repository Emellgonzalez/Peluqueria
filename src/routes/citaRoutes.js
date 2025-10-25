const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/citaController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, citaCtrl.listar); // listar protegido
router.get('/:id', auth, citaCtrl.obtener);
router.post('/', auth, citaCtrl.crear);
router.put('/:id', auth, citaCtrl.actualizar);
router.delete('/:id', auth, citaCtrl.borrar);

module.exports = router;
