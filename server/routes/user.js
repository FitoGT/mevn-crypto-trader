const express = require('express');
const jwt = require('jsonwebtoken')
const userSchema = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post("/user/login", (req, res) => {
  try {
    const name = req.body.name
    const password = req.body.password
    userSchema.findOne({ name: name })
      .then(async (data) => {
        if (!data) {
          res.status(404).json({ error: 'User Not Found' })
          return
        }
        const user = data
        try {
          if (await bcrypt.compare(req.body.password, user.password)) {
            const sign = { name: user.name }
            const accessToken = jwt.sign(sign, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken })
          } else {
            res.status(401).json({ error: 'Invalid Password' })
          }
        } catch {
          res.status(500).json({ error: 'Internar Server Error' })
        }

      })
      .catch(error => res.status(400).json({ error: 'Bad Request, invalid or missing input' }))
  } catch (error) {
    res.status(400).json({ error: 'Bad Request, invalid or missing input' });
  }
})

router.post("/user/register", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10)
    const name = req.body.name
    const user = {
      name,
      password
    }
    if (user) {
      const registerUser = userSchema(user)
      registerUser.save()
        .then(data => {
          const sign = { name: name }
          const accessToken = jwt.sign(sign, process.env.ACCESS_TOKEN_SECRET)
          res.status(200).json({ accessToken })
        })
        .catch(error => {
          res.status(400).json({ error })
        })
      return
    }
    res.status(409).json({ error: 'Conflict, user not exist or invalid password' })
  } catch (error) {
    res.status(400).json({ error: 'Bad Request, invalid or missing input' });
  }
})

module.exports = router