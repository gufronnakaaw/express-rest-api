import validate from '../validation/validate.js';
import {
  GetUserValidation,
  LoginUserValidation,
  LogoutUserValidation,
  RegisterUserValidation,
  UpdateUserValidation,
} from '../validation/user.validation.js';
import prisma from '../utils/database.js';
import ResponseError from '../error/ResponseError.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function register(request) {
  const user = validate(RegisterUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'Username already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      email: true,
    },
  });
}

async function login(request) {
  const loginReq = validate(LoginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      username: loginReq.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const checkPassword = await bcrypt.compare(loginReq.password, user.password);

  if (!checkPassword) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();

  return prisma.user.update({
    data: {
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
}

async function get(username) {
  username = validate(GetUserValidation, username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      email: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
}

async function update(request) {
  const user = validate(UpdateUserValidation, request);

  const totalUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUser < 1) {
    throw new ResponseError(404, 'User not found');
  }

  const data = {};

  if (user.email) {
    data.email = user.email;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prisma.user.update({
    where: {
      username: user.username,
    },
    data,
    select: {
      username: true,
      email: true,
    },
  });
}

async function logout(username) {
  username = validate(LogoutUserValidation, username);

  const count = await prisma.user.count({
    where: {
      username,
    },
  });

  if (count < 1) {
    throw new ResponseError(404, 'User not found');
  }

  return prisma.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
  });
}

export default {
  register,
  login,
  get,
  update,
  logout,
};
