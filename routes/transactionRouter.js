const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, transactionController.getUserTransactions)
  .post(transactionController.createTransaction);

module.exports = router;
