import { validate } from '../validation/validate.js';
import {
  CreateContactValidation,
  GetContactValidation,
  RemoveContactValidation,
  SearchContactValidation,
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

async function remove(user, contactId) {
  contactId = await validate(RemoveContactValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
}

async function search(user, request) {
  request = validate(SearchContactValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          firstname: {
            contains: request.name,
          },
        },
        {
          lastname: {
            contains: request.name,
          },
        },
      ],
    });
  }

  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const contacts = await prisma.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip,
  });

  const totalItem = await prisma.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    page: request.page,
    total_page: Math.ceil(totalItem / request.size),
    total_item: totalItem,
  };
}

export default { create, get, update, remove, search };
