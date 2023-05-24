const express = require('express');
const rolesController = require('../controllers/rolesController');

const router = express.Router();

router.get('/roles', rolesController.listar);
router.get('/AgregarRol', rolesController.crear);
router.get('/Permisos/:idRoles', rolesController.permisos);
router.get('/Permisos/', rolesController.permisos);
router.get('/EditarRol/:idRoles', rolesController.editar);

router.post('/AgregarRol/', rolesController.registrar);
router.post('/EditarRol/:idRoles', rolesController.actualizar);
//router.post('/EliminarRol', rolesController.eliminar);
router.post('/EliminarAsignacion/:idRoles', rolesController.eliminarAsignacion);
module.exports = router;