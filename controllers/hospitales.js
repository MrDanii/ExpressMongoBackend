const { response } = require('express')

const Hospital = require("../models/hospital")

const getHospitales = async (req, res = response) => {

  // const hospitales = await Hospital.find()
  const hospitales = await Hospital.find().populate('usuario', 'nombre imagen')

  return res.json({
    ok: true,
    hospitales
  })
}

const crearHospital = async (req, res = response) => {

  const uid = req.uid
  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  })

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: true,
      msg: "Unexpected Error"
    })
  }
}

const actualizarHospital = async (req, res = response) => {

  const idHospital = req.params.id
  const uid = req.uid

  try {
    const hospital = await Hospital.findById(idHospital)

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado"
      })
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    // la opcion "new" regresa el ultimo documento actualizado
    const hospitalActualizado = await Hospital.findByIdAndUpdate(idHospital, cambiosHospital, { new: true })

    return res.json({
      ok: true,
      hospital: hospitalActualizado
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Unexpected Error"
    })
  }
}

const borrarHospital = async (req, res = response) => {
  const idHospital = req.params.id

  try {
    const hospital = await Hospital.findById(idHospital)

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado"
      })
    }

    await Hospital.findByIdAndDelete(idHospital)

    return res.json({
      ok: true,
      msg: "Hospital eliminado"
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Unexpected Error"
    })
  }
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
}