import { CreateUserController } from '@users/useCases/createUser/CreateUserController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(45).messages({
        'string.base': `"nome" deve ser uma string`,
        'string.empty': `"nome" não pode ser um campo vazio`,
        'string.max': `"nome" deve ter no máximo 100 caracteres`,
        'any.required': `"nome" é um campo requerido`,
      }),
      email: Joi.string().required().max(45).messages({
        'string.base': `"email" deve ser uma string`,
        'string.empty': `"email" não pode ser um campo vazio`,
        'string.max': `"email" deve ter no máximo 100 caracteres`,
        'any.required': `"email" é um campo requerido`,
      }),
      password: Joi.string().min(8).required().max(45).messages({
        'string.base': `"senha" deve ser uma string`,
        'string.empty': `"senha" não pode ser um campo vazio`,
        'string.min': `"senha" deve ter no mínimo 8 caracteres`,
        'string.max': `"senha" deve ter no máximo 45 caracteres`,
        'any.required': `"senha" é um campo requerido`,
      }),
      confirmPassword: Joi.string().required().max(45).messages({
        'string.base': `"confirmação de senha" deve ser uma string`,
        'string.empty': `"confirmação de senha" não pode ser um campo vazio`,
        'string.max': `"confirmação de senha" deve ter no máximo 45 caracteres`,
        'any.required': `"confirmação de senha" é um campo requerido`,
      }),
      role: Joi.string().required().max(45).messages({
        'string.base': `"função" deve ser uma string`,
        'string.empty': `"função" não pode ser um campo vazio`,
        'string.max': `"função" deve ter no máximo 100 caracteres`,
        'any.required': `"função" é um campo requerido`,
      }),
    },
  }),
  createUserController.handle,
);

export { usersRoutes };
