const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")

const validarJWT = (req, res, next) => {
  const token = req.header("x-token")

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: "Missing token"
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("uid >> ", uid);
    req.uid = uid
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token"
    })
  }

  next();
}

const validarAdminRol = async (req, res = response, next) => {
  const uid = req.uid

  try {
    const usuarioDB = await Usuario.findById(uid)

    if(!usuarioDB){
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario"
      })
    }
    
    if(usuarioDB.rol !== "ADMIN_ROLE"){
      console.log("Distinto de ADMIN_ROLE");
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para acceder"
      })
    }

    next()

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al validar Admin Rol"
    })
  }
}

const validarAdminRolAndSameUser = async (req, res = response, next) => {
  const uid = req.uid         // Usuario que realiza la operacion
  const id = req.params.id    // Usuario que sera actualizado

  try {
    const usuarioDB = await Usuario.findById(uid)

    if(!usuarioDB){
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario"
      })
    }
    
    if(usuarioDB.rol === "ADMIN_ROLE" || id === uid){
      // console.log("Es ADMIN_ROLE");
      next()
    }else {
      //Si no tiene rol "ADMIN_ROLE" y Si no es el mismo usuario entonces...
      // console.log("Distinto de ADMIN_ROLE");
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para acceder"
      })
    }

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al validar Admin Rol"
    })
  }
}

module.exports = {
  validarJWT,
  validarAdminRol,
  validarAdminRolAndSameUser
}