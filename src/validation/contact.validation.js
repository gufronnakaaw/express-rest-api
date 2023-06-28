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

const SearchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  CreateContactValidation,
  GetContactValidation,
  UpdateContactValidation,
  RemoveContactValidation,
  SearchContactValidation,
};
