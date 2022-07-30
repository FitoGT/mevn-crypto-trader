const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  address: {
    type: String,
  }
})

module.exports = mongoose.model('Transactions', transactionSchema)