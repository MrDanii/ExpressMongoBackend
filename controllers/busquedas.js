const { response } = require('express')
const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medico')

const getTodo = async (req, res = response) => {

  const { busqueda } = req.params
  const regex = new RegExp(busqueda, 'i')   // Flag 'i' means: case insensitive

  // 237 ms (second time)
  // const usuarios = await Usuario.find({nombre: regex})
  // const hospitales = await Hospital.find({nombre: regex})
  // const medicos = await Medico.find({nombre: regex})

  // 132 ms (second time)
  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ])

  try {
    return res.json({
      ok: true,
      usuarios,
      hospitales,
      medicos
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "unexpected error"
    })
  }
}

const getDocumentosColeccion = async (req, res = response) => {

  const { tabla, busqueda } = req.params
  const regex = new RegExp(busqueda, 'i')   // Flag 'i' means: case insensitive

  let data = []
  switch (tabla) {
    case 'medicos':
      data = await Medico.find({ nombre: regex })
        .populate('usuario', "nombre imagen")
        .populate('hospital', "nombre imagen")
      break;
    case 'hospitales':
      data = await Hospital.find({ nombre: regex })
        .populate('usuario', "nombre imagen")
      break;
    case 'usuarios':
      data = await Usuario.find({ nombre: regex })
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "Las tablas tienen que ser medicos/hospitales/usuarios"
      })
  }
  return res.json({
    ok: true,
    resultados: data
  })
}

module.exports = {
  getTodo,
  getDocumentosColeccion
}