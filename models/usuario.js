const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE"
  },
  google: {
    type: Boolean,
    default: false
  }
})

// Si queremos modificar la visualizacion de los datos podemos realizar lo siguiente
// Nota: esto no afecta la base de datos (solo es visual)
UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object} = this.toObject();
  object.uid = _id
  return object
})

module.exports = model('Usuario', UsuarioSchema)