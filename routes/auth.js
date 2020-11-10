/* 
    Ruta: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { verifyLogin } = require('../controllers/auth')

const router = Router();

router.post('/', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validarCampos
], verifyLogin);

module.exports = router