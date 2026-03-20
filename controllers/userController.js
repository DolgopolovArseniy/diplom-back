const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
});

exports.getUserBySlug = catchAsync(async (req, res, next) => {
  const userExists = await User.exists({ donationSlug: req.params.slug });

  if (!userExists) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    exists: true,
  });
});
