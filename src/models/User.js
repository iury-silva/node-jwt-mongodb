const mongoose = require('../database')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

  name: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type:String,
    required: true,
    select: false,
  },
  confirmPassword: {
    type:String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 12)
    const hash2 = await bcrypt.hash(this.confirmPassword, 12)

    this.password = hash
    this.confirmPassword = hash2
})

const User = mongoose.model("User", UserSchema)

module.exports = User;