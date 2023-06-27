import Joi from 'joi';

const CreateContactValidation = Joi.object({
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
  phone: Joi.string().max(20).optional(),
});

const GetContactValidation = Joi.number().positive().required();

const UpdateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
  phone: Joi.string().max(20).optional(),
});

const RemoveContactValidation = Joi.number().positive().required();

export {
  CreateContactValidation,
  GetContactValidation,
  UpdateContactValidation,
  RemoveContactValidation,
};
