const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync((req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
});
