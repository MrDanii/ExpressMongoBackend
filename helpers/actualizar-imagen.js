const fs = require('fs')
const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require("../models/usuario")

const deleteImg = (oldPath) => {
  if (fs.existsSync(oldPath)) {
    console.log("Ya existe imagen, reemplazando");
    fs.unlinkSync(oldPath)
  }
}

const actualizarImagen = async (tipo, id, newFileName) => {
  let oldPath

  switch (tipo) {
    case "hospitales":
      console.log("hospitales")
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        console.log("No se encontro hospital con ese ID")
        return false
      }

      oldPath = `./uploads/hospitales/${hospital.imagen}`
      deleteImg(oldPath)

      hospital.imagen = newFileName
      await hospital.save()
      return true

    case "medicos":
      console.log("medicos")
      const medico = await Medico.findById(id)
      if (!medico) {
        console.log("No se encontro medico con ese ID")
        return false
      }

      // delete Img
      oldPath = `./uploads/medicos/${medico.imagen}`
      deleteImg(oldPath)

      medico.imagen = newFileName
      await medico.save()
      return true

    case "usuarios":
      console.log("usuarios")
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        console.log("No se encontro usuario con ese ID")
        return false
      }

      oldPath = `./uploads/usuarios/${usuario.imagen}`
      deleteImg(oldPath)

      usuario.imagen = newFileName
      await usuario.save()
      return true
    default:
      console.log("Tipos validos, hospitales, medicos y usuarios")
      return false
  }
}

module.exports = {
  actualizarImagen
}