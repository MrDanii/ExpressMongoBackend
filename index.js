require('dotenv').config();
const express = require("express");
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Crear Servidor
const app = express();

// configurar cors
// use es considerado un 'middleware' que se ejecuta para todas las instrucciones siguientes
app.use(cors())

// Base de datos
dbConnection();

app.get('/', (req, resp) => {
  resp.json({
    ok: true,
    msg: "Backend Hello"
  })
});

app.listen(process.env.PORT, () => {
  console.log("Server is running in port " + process.env.PORT)
});