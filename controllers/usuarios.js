const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarToken } = require('../helpers/jwt');

// get users from hospital databse
const getUsuarios = async (req, resp = response) => {

  const desde = Number(req.query.desde) || 0;

  // const usuarios = await Usuario.find({}, 'nombre email rol google')
  //   .skip(desde)
  //   .limit(5);
  // const total = await Usuario.count()

  // NOTA: Un truco bastante interesante!!
  // Podemos ejecutear 2 promesas de manera assincrona y además esperar a que las 2 terminen de manera sincrona
  // Ya solo basta desestructurar cada resultado
  const [usuarios, total] = await Promise.all([
    Usuario
      .find({}, 'nombre email rol google imagen')
      .skip(desde)
      .limit(5),
    Usuario.countDocuments()
  ])

  resp.json({
    ok: true,
    usuarios,
    uid: req.uid
  })
}

const crearUsuario = async (req, resp = response) => {
  /* En caso de que la peticion contenga mas parametros (req), 
  los parametros serían ignorados ya que no están contemplados en el modelo */
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email })

    if (existeEmail) {
      return resp.status(400).json({
        ok: false,
        msg: "El correo ya ha sido registrado"
      })
    }

    const usuario = new Usuario(req.body)

    // Encriptar password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    // Generear JWT
    const token = await generarToken(usuario._id)

    // Guardar Usuario
    await usuario.save()

    resp.json({
      ok: true,
      usuario,
      token
    })
  } catch (error) {
    console.log('Something went wrong, watch logs for more info')
    resp.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    })
  }
}

const actualizarUsuario = async (req, res = response) => {

  // TODO: a futuro, hay que validar el token y validar si es el mismo 
  // usuario el que quiere actualizar sus propios datos
  const uid = req.params.id

  try {
    // Verificar que existe el usuario
    // quitar campos que no actualizaremos
    // Validar si esta enviando su mismo email (si envia el mismo, lo quitamos de los datos a actualizar)
    const usuarioActual = await Usuario.findById(uid)

    if (usuarioActual) {
      const { password, google, email, ...campos } = req.body

      if (usuarioActual.email !== email) {
        const existeEmail = await Usuario.findOne({ email })
        if (existeEmail) {
          return res.status(400).json({
            ok: false,
            msg: "Ya existe un usuario con ese email"
          })
        }
      }

      if(!usuarioActual.google){
        campos.email = email
      }else{
        if(usuarioActual.email !== email){
          return res.status(420).json({
            ok: false,
            msg: "Usuarios de google no pueden cambiar su correo"
          })
        }
      }
      const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })

      res.json({
        ok: true,
        usuario: usuarioActualizado
      });
    } else {

      return res.status(404).json({
        ok: false,
        uid: "no existe un usuario con ese id"
      })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "unexpected error"
    })
  }
}

const borrarUsuario = async (req, res = response) => {

  try {
    const uid = req.params.id

    // Verificar que exista
    const existeUsuario = await Usuario.findById(uid)

    if (!existeUsuario) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese email"
      })
    }

    await Usuario.findByIdAndDelete(uid)

    return res.json({
      ok: true,
      uid: 'Usuario eliminado'
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: "Unexpected Error"
    })
  }
}

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }