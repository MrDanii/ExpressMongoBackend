/* 
    Ruta: api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { validarJWT,
    validarAdminRol,
    validarAdminRolAndSameUser
} = require('../middleware/validar-jwt');

const router = Router();
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
// const { getUsuarios } = require('../controllers/usuarios')
// const { crearUsuario } = require('../controllers/usuarios')
// const { actualizarUsuario } = require('../controllers/usuarios')

router.get('/', [
    validarJWT
], getUsuarios);

// const campos = ['nombre', 'password', 'email'] // Se puede hacer con un arreglo de cadenas
router.post('/', [
    check('nombre', 'nombre is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    validarCampos   // nuestro middleware, se llama despues de los checks
    // check(campos,'nombre, password, email: are required').not().isEmpty()
], crearUsuario);

router.put('/:id', [
    validarJWT,
    validarAdminRolAndSameUser,
    check('nombre', 'nombre is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('rol', 'rol is required').not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [
    validarJWT,
    validarAdminRol
    // check('nombre', 'nombre is required').not().isEmpty(),
    // check('email', 'email is required').isEmail(),
    // check('rol', 'rol is required').not().isEmpty(),
], borrarUsuario);

module.exports = router
// module.exports = { router }