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
  const idMedico = req.params.id
  const uid = req.uid

  try {
    const medico = await Medico.findById(idMedico)

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No hay medico con ese ID"
      })
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, { new: true })

    return res.json({
      ok: true,
      medico: medicoActualizado
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error"
    })
  }
}
const borrarMedico = async (req, res = response) => {
  const idMedico = req.params.id

  try {
    const medico = await Medico.findById(idMedico)

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No hay medico con ese ID"
      })
    }

    await Medico.findByIdAndDelete(idMedico)

    return res.json({
      ok: true,
      msg: "Medico borrado"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error"
    })
  }
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
}