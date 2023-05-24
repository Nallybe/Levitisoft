const express = require('express');
const comprasController = require('../controllers/comprasController');

const router = express.Router();

router.get('/compras', comprasController.listar);
router.get('/compras_detallar', comprasController.detallar);
router.get('/compras_registrar', comprasController.crear);
router.get('/compras_anular', comprasController.anular);

module.exports = router;