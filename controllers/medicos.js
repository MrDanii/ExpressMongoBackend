const { response } = require('express')
const Medico = require("../models/medico")

const getMedicos = async (req, res = response) => {

  const medicos = await Medico.find()
    .populate('usuario', 'nombre')
    .populate('hospital', 'nombre')

  return res.json({
    ok: true,
    medicos
  })
}
const crearMedico = async (req, res = response) => {

  const uid = req.uid

  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {
    const medicoDB = await medico.save();

    return res.json({
      ok: true,
      medico: medicoDB
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error"
    })
  }
}
const actualizarMedico = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: "actualizarMedico"
  })
}
const borrarMedico = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: "borrarMedico"
  })
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
}