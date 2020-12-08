const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
}, { collection: 'medicos' })

// Si queremos modificar la visualizacion de los datos podemos realizar lo siguiente
// Nota: esto no afecta la base de datos (solo es visual)
MedicoSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object
})

module.exports = model('Medico', MedicoSchema)