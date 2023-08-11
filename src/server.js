const express = require('express')
const AuthController = require('./controllers/AuthController')
const AdminController = require('./controllers/AdminController')
const AuthAuthenticate = require('./middlewares/AuthAutenticate')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
/**
 * @description Routes API
 */
app.use('/auth', AuthController)
app.use('/admin', AuthAuthenticate, AdminController)

app.get('/', (req, res) => {
  
  res.status(200).json({
      error: false,
      message: "Acesso bem sucedido! 🚀"
    })
})

app.listen(3000, () => {
  console.log('server is running 🔥')
})