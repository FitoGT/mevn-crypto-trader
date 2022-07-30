const express = require('express');
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const userRoutes = require("./routes/user")
const transactionsRoutes = require("./routes/transactions")
require("dotenv").config();

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
app.use(cors())
app.use(express.json())

//mongodb connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('connected to db atlas'))
  .catch((error) => console.error(error))

//middleware
app.use("/api", userRoutes)
app.use("/api", transactionsRoutes)

app.listen(PORT, () => {
  console.log(`server starter on port: ${PORT}`)
})  