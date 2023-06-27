import { validate } from '../validation/validate.js';
import {
  CreateContactValidation,
  GetContactValidation,
  UpdateContactValidation,
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

async function update(user, request) {
  const contact = validate(UpdateContactValidation, request);

  const totalContact = await prisma.contact.count({
    where: {
      id: contact.id,
      username: user.username,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prisma.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
    },
  });
}

export default { create, get, update };
