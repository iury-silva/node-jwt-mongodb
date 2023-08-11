const mongoose = require('mongoose')
require('dotenv').config()


const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.dp3ujbb.mongodb.net/?retryWrites=true&w=majority`).then(()=> {
  console.log("conectado ao mongoDB");
}).catch((err) => console.log(err))

mongoose.Promise = global.Promise


module.exports = mongoose