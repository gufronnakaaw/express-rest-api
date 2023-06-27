import { validate } from '../validation/validate.js';
import { CreateContactValidation } from '../validation/contact.validation.js';
import { prisma } from '../utils/database.js';

async function create(user, request) {
  const contact = validate(CreateContactValidation, request);
  contact.username = user.username;

  return prisma.contact.create({
    data: contact,
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
    },
  });
}

export default { create };
