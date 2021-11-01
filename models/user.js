const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const isValid = isEmail(v);
        return isValid;
      },
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
<<<<<<< HEAD
    required: true;
=======
    required: true,
>>>>>>> 7b0dd6fa96163d6e40a67532c98b9cc09c022ab3
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
