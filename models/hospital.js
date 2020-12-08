const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, { collection: 'hospitales' })

// Si queremos modificar la visualizacion de los datos podemos realizar lo siguiente
// Nota: esto no afecta la base de datos (solo es visual)
HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object
})

module.exports = model('Hospital', HospitalSchema)