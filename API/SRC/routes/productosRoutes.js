const express = require('express');
const router = express.Router();
const ctrl = require('../controller/productoController');

router.get('/', ctrl.listar);
router.post('/', ctrl.crear);
router.delete('/:id', ctrl.eliminar);

module.exports = router;