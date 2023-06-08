const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();


router.get('/login', loginController.crear);
router.post('/register', loginController.registrar);

router.post('/login', loginController.auth);
router.get('/logout', loginController.logout);

router.get('/registro/:idAccess', loginController.registro);
router.post('/registro/:idAccess', loginController.registroinfo);





module.exports = router;