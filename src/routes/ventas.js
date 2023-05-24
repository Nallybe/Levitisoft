const express = require('express');
const ventasController = require('../controllers/ventasController');

const router = express.Router();

router.get('/ventas', ventasController.listar);
router.get('/AgregarVenta', ventasController.crear);
router.post('/AgregarVenta', ventasController.registrar);
router.get('/AgregarProduc', ventasController.agregarProducto);
router.get('/ListarProduc/:idVentas', ventasController.listarProducto);
module.exports = router;