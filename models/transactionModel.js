const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
    min: [0.01, 'The transaction amount must be greater than zero'],
  },
  currency: {
    type: String,
    enum: ['ETH', 'BTC', 'SOL', 'USDT', 'USD', 'EUR', 'UAH'],
    uppercase: true,
  },
  from: {
    type: String,
    required: [true, 'Sender information is required'],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  message: String,
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  transactionStatus: {
    type: String,
    enum: ['failed', 'completed', 'pending'],
    default: 'pending',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
