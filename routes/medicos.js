/* 
    Ruta: api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
} = require('../controllers/medicos')

router.get('/', [
  validarJWT
], getMedicos);

// const campos = ['nombre', 'password', 'email'] // Se puede hacer con un arreglo de cadenas
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser valido').isMongoId(),
  validarCampos
], crearMedico);

router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser valido').isMongoId(),
], actualizarMedico);

router.delete('/:id', [
  validarJWT
], borrarMedico);

router.get('/:id', [
  validarJWT
], getMedicoById);

module.exports = router
// module.exports = { router }