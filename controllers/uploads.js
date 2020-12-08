const path = require("path")
const fs = require("fs")
const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res = response) => {

  const tipo = req.params.tipo;
  const id = req.params.id;

  // validar tipos
  const validTypes = ["hospitales", "medicos", "usuarios"]
  if (!validTypes.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "no es de tipo hospital, medico o usuario"
    })
  }

  // validate existing file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "Theres no file"
    });
  }

  // Getting File Object and file extension
  const file = req.files.image

  const tokensFile = file.name.split('.')
  const fileExtension = tokensFile[tokensFile.length - 1]

  // Validate file extensions
  const validExtensions = ["jpg", "jpeg", "png", "gif"]
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid Extension File"
    })
  }

  // Create unique file name
  const newFileName = `${uuidv4()}.${fileExtension}`

  // Create Path to store image
  const pathFile = `./uploads/${tipo}/${newFileName}`

  // Move file to server
  file.mv(pathFile, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        ok: false,
        msg: 'Path File Error'
      })
    }

    // actualizar imagen
    actualizarImagen(tipo, id, newFileName)

    return res.json({
      ok: true,
      msg: "File Uploaded",
      fileName: newFileName
    })
  });

}

const fileDownload = (req, res = response) => {

  const tipo = req.params.tipo
  const imageName = req.params.foto

  // __dirname nos da la ruta donde se encuentra la aplicacion desplegada
  let pathImg = path.join(__dirname, `../uploads/${tipo}/${imageName}`)

  if(!fs.existsSync(pathImg)){
    pathImg = path.join(__dirname, `../uploads/no-image-found.jpg`)
  }
  
  res.sendFile(pathImg)

}

module.exports = {
  fileUpload,
  fileDownload
}