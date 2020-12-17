/* 
    Ruta: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const { verifyLogin, googleSignIn, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validarCampos
], verifyLogin);

router.post('/google', [
  check('token', 'google token is required').not().isEmpty(),
  validarCampos
], googleSignIn);

router.get('/renew', [
  validarJWT
], renewToken);

module.exports = router