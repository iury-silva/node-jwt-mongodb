const express = require('express')
const UserModel = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('node-email-validation')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
      user: 'iury2002silva@hotmail.com',
      pass: 'Familia8'
  },
});


const generateToken = (User = {}) => {
  return jwt.sign({
    id: User._id,
    name: User.name
  }, process.env.SECRET , {
    expiresIn: 86400
  })
}

router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword} = req.body

    if(await UserModel.findOne({email})) {
      return res.status(400).json({
        error: true,
        message: "Usuário já existe"
      })
    }

    if(password != confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "As senhas não correspondem!"
      })
    }

    if (!validator.is_email_valid(email)) {
      return res.status(400).json({
        error: true,
        message: "Digite um email valido"
      })
    }
    console.log(req.body);
    console.log(email);
    const User = await UserModel.create(req.body);

    const mailOptions = {
      from: 'Iury teste <iury2002silva@hotmail.com>',
      to: email,
      subject: 'Registrado com sucesso amigão!',
      text: 'testando envios de email utilizando nodemailer',
      html: '<h1>Testando envios de email no nodemailer</h1> <br/> <p>A principio esta funcionando</p>'
  };
  
  
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      return console.log(err)
    } else {
      return console.log("email enviado com sucesso" + info.response)
    }
  })


    User.password = undefined
    User.confirmPassword = undefined

    return res.status(200).json({
      error: false,
      message: "Usuário registrado com sucesso!",
      data: User
    })
});

router.post('/login', async (req, res) => {

  const {email, password} = req.body

  const User = await UserModel.findOne({email}).select("+password")
  
  if(!User) {
    return res.status(400).json({
      error: true,
      message: "Usuário não encontrado!"
    })
  }
  if(!await bcrypt.compare(password, User.password)) {
    return res.status(400).json({
      error: true,
      message: "Senha invalida!"
    })
  }


  User.password = undefined


  return res.status(200).json({
      User,
      access_token : generateToken(User)
  })
})

module.exports = router