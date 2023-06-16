import { validate } from '../validation/validate.js';
import { RegisterUserValidation } from '../validation/user.validation.js';
import { prisma } from '../utils/database.js';
import { ResponseError } from '../error/ResponseError.js';
import bcrypt from 'bcrypt';

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

export default {
  register,
};
