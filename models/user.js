const mongoose = require('mongoose');
const validatorUrl = require('validator').isURL;
const validatorEmail = require('validator').isEmail;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'это поле является обязательным для заполения'],
    minlength: [2, 'минимальное количество символов - 2'],
    maxlength: [30, 'максимальное количество символов - 30'],
  },
  about: {
    type: String,
    required: [true, 'это поле является обязательным для заполения'],
    minlength: [2, 'минимальное количество символов - 2'],
    maxlength: [30, 'максимальное количество символов - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'это поле является обязательным для заполения'],
    validate: {
      validator: (v) => validatorUrl(v),
      message: 'передана некорректная ссылка',
    },
  },
  email: {
    type: String,
    required: [true, 'это поле является обязательным для заполения'],
    validate: {
      validator: (v) => validatorEmail(v),
      message: 'указан неверный адрес почтового ящика',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'это поле является обязательным для заполения'],
  },
  minlength: 8,
});

module.exports = mongoose.model('user', userSchema);
