const express = require('express');
const reparacionesController = require('../controllers/reparacionesController');

const router = express.Router();

router.get('/reparaciones', reparacionesController.listar);
router.get('/reparaciones_agregar', reparacionesController.crear);
router.get('/reparaciones_editar', reparacionesController.editar1);
router.get('/reparaciones_editar2', reparacionesController.editar2);
router.get('/reparaciones_detalle', reparacionesController.detallar);

module.exports = router;