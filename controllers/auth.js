const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario")
const { generarToken } = require('../helpers/jwt')
const { verify, googleVerify } = require('../helpers/google-verify')

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
    if (!validPassword) {
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

const googleSignIn = async (req, res = response) => {

  const googleToken = req.body.token
  try {
    
    // 1. verificamos el google token y obtenemos el email, name y picture de la autenticacion de google
    const {email, name, picture} = await googleVerify(googleToken);

    // 2. Verificar si el usuario ya existe
    const usuarioDB = await Usuario.findOne({email})
    let usuario

    // Si no existe el usuario, creamos un nuevo usuario
    if(!usuarioDB){
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: '@@@',
        imagen: picture,
        google: true
      })
      
    }else{
      // Si existe el usuario, cambiamos el modo de autenticacion a google
      usuario = usuarioDB
      usuario.google = true
      // usuario.password = '@@@'  // Si queremos quitarle la autenticacion por password
    }

    // Guardamos los cambios
    await usuario.save()

    // Generamos el jwt
    const token = await generarToken(usuario.id)

    res.json({
      ok: true,
      token
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Incorrect Google Token"
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid
  const token = await generarToken(uid)

  return res.json({
    ok: true,
    token
  })
}
module.exports = {
  verifyLogin, 
  googleSignIn,
  renewToken
}