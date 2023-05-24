const express = require('express');
const productosController = require('../controllers/productosController');

const router = express.Router();

router.get('/ProductosDash', productosController.listar);
//router.get('/AgregarProduc', productosController.crear);
router.get('/EditarProduc', productosController.editar);


module.exports = router;