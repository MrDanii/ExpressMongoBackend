const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario")
const { generarToken } = require('../helpers/jwt')

const verifyLogin = async (req, res = response) => {
  
  try {
    const { email, password } = req.body
    const usuarioDB = await Usuario.findOne({ email })
  
    // Verificar Usuario
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Email o password no coinciden"
      })
    }
  
    // Verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password)
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: "email o Password no coinciden"
      })
    }
  
    // Generar JWT
    const token = await generarToken(usuarioDB.id)

    return res.json({
      ok: true,
      token
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Unexpecred error'
    })
  }
}

module.exports = { verifyLogin }