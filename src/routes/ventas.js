const express = require('express');
const ventasController = require('../controllers/ventasController');

const router = express.Router();

// Middleware de verificación de sesión
const checkSession = (req, res, next) => {
    if (req.session.loggedin) {
        // Si hay una sesión activa, continuar con la siguiente ruta
        res.locals.name = req.session.name;
        next();
    } else {
        // Si no hay una sesión activa, redireccionar al login
        res.redirect('/login');
    }
};

router.get('/ventas', checkSession, ventasController.listar);

// Rutas de ventas con verificación de sesión
router.get('/AgregarVenta', checkSession, ventasController.crear);
router.post('/AgregarVenta', checkSession, ventasController.registrar);
router.get('/AgregarProduc', checkSession, ventasController.agregarProducto);
router.get('/ListarProduc/:idVentas', checkSession, ventasController.listarProducto);

module.exports = router;
