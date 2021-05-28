import Joi from 'joi';

// Registration Validation
const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).lowercase().required(),
  password: Joi.string().min(6).required(),
});

// Login Validation
const loginValidation = Joi.object({
  username: Joi.string().min(3).max(30).lowercase().required(),
  password: Joi.string().min(6).required(),
});

export { registerValidation, loginValidation };
