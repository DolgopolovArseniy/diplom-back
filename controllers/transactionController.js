const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUserTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({
    to: req.user._id,
    transactionStatus: 'completed',
  }).sort('-transactionDate');

  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const { slug, currency, from, message, amount } = req.body;

  const recipient = await User.findOne({ donationSlug: slug });

  if (!recipient) {
    return next(new AppError('Recipient not found', 404));
  }

  const transaction = await Transaction.create({
    amount,
    currency,
    from,
    message,
    transactionStatus: 'completed',
    to: recipient._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});
