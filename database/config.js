const mongoose = require('mongoose');

// mean
// RQBqA42Q0Ajr0Pn7
// mongodb+srv://mean:PwtI75oe9emaTDOb@cluster0.hgazz.mongodb.net/test?authSource=admin&replicaSet=atlas-11pft7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
// mongodb+srv://mean:RQBqA42Q0Ajr0Pn7@cluster0.hgazz.mongodb.net/test?authSource=admin&replicaSet=atlas-11pft7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

const dbConnection = async () => {

  try {
    await mongoose.connect(
      process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    console.log("Database Working")
  }
  catch (error){
    console.log(error)
    throw new Error('Error initializating database, see logs for more info')
  }
}

module.exports = {
  dbConnection
}