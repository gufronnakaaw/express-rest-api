import { validate } from '../validation/validate.js';
import {
  CreateContactValidation,
  GetContactValidation,
} from '../validation/contact.validation.js';
import { prisma } from '../utils/database.js';
import { ResponseError } from '../error/ResponseError.js';

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

async function get(user, contactId) {
  contactId = validate(GetContactValidation, contactId);

  const contact = await prisma.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, 'Contact not found');
  }

  return contact;
}

export default { create, get };
