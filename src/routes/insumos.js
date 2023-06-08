const express = require('express');
const insumosController = require('../controllers/insumosController');

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

router.get('/insumos', checkSession, insumosController.listar);
router.get('/AgregarInsumo', checkSession, insumosController.crear);
router.post('/AgregarInsumo', checkSession, insumosController.registrar);
router.get('/EditarInsumo/:idInsumos', checkSession, insumosController.editar);
router.post('/EditarInsumo/:idInsumos', checkSession, insumosController.actualizar);
router.post('/EliminarInsumo', checkSession, insumosController.eliminar);

module.exports = router;