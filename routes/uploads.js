/*
    Ruta: /api/upload
*/

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const expressFileUpload = require('express-fileupload');

const { fileUpload, fileDownload } = require("../controllers/uploads")
const router = Router()

// configuracion por defect
router.use(expressFileUpload());

router.put('/:tipo/:id', [
  validarJWT
], fileUpload);

router.get('/:tipo/:foto', [
  // validarJWT
], fileDownload);

// router.get('/coleccion/:tabla/:busqueda', [
//   validarJWT
// ], getDocumentosColeccion);

module.exports = router