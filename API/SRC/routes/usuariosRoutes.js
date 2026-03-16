const express = require('express');
const router = express.Router();
const ctrl = require('../controller/usuariosController');

router.post('/login', ctrl.login);

module.exports = router;