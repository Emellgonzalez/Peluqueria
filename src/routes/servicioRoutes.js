const express = require('express');
const router = express.Router();
const servicioCtrl = require('../controllers/servicioController');
const auth = require('../middleware/authMiddleware');

router.get('/', servicioCtrl.listar);
router.get('/:id', servicioCtrl.obtener);
router.post('/', auth, servicioCtrl.crear); // crear protegido
router.put('/:id', auth, servicioCtrl.actualizar);
router.delete('/:id', auth, servicioCtrl.borrar);

module.exports = router;
