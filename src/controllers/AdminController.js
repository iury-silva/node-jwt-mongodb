const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find()
    return res.json({allUsers});
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      msg: "Não há usuários!"
    })
  }
})

module.exports = router;