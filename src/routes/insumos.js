const express = require('express');
const insumosController = require('../controllers/insumosController');

const router = express.Router();

router.get('/insumos', insumosController.listar);
router.get('/AgregarInsumo', insumosController.crear);
router.post('/AgregarInsumo', insumosController.registrar);
router.get('/EditarInsumo/:idInsumos', insumosController.editar);
router.post('/EditarInsumo/:idInsumos', insumosController.actualizar);
router.post('/EliminarInsumo', insumosController.eliminar);

module.exports = router;