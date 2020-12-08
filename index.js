require('dotenv').config();
const express = require("express");
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Crear Servidor
const app = express();

// configurar cors
// cors() es considerado un 'middleware' que se ejecuta para todas las instrucciones siguientes
app.use(cors());

// Lectura y parseo del body // Nota:: cualquier middleware se utiliza con use
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/todo', require('./routes/busquedas'))
app.use('/api/upload', require('./routes/uploads'))

app.listen(process.env.PORT, () => {
  console.log("Server is running in port " + process.env.PORT)
});