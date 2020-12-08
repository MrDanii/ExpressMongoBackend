/* 
    Ruta: api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
} = require('../controllers/hospitales')

router.get('/', [

], getHospitales);

// const campos = ['nombre', 'password', 'email'] // Se puede hacer con un arreglo de cadenas
router.post('/', [
  validarJWT,
  check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
  validarCampos
], crearHospital);

router.put('/:id', [

], actualizarHospital);

router.delete('/:id', [

], borrarHospital);

module.exports = router
// module.exports = { router }