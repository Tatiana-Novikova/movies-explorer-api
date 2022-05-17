const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" (электронная почта) должно быть заполнено'],
    unique: [true, 'Поле "email" (электронная почта) должно содержать уникальное значение'],
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
    required: [true, 'Поле "password" (пароль) должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" (имя) должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" (имя) - 2'],
    maxlength: [30, 'Максимальная длина поля "name" (имя) - 30'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
