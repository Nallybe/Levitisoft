const express = require('express');
const clientesController = require('../controllers/clientesController');

const router = express.Router();

router.get('/clientes', clientesController.listar);
router.get('/clientes_agregar', clientesController.crear);
router.post('/clientes_agregar', clientesController.registrar);
router.get('/clientes_editar/:idInfo', clientesController.editar);
router.post('/clientes_editar/:idInfo', clientesController.actualizar);


module.exports = router;