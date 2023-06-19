import Joi from 'joi';

const RegisterUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
});

const LoginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

export { RegisterUserValidation, LoginUserValidation };
