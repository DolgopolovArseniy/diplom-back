const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 8,
    select: false,
    required: true,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  donationSlug: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
  },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  // next(); old version :D
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
