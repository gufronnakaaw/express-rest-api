import { ResponseError } from '../error/ResponseError.js';
import { prisma } from '../utils/database.js';
import {
  CreateAddressValidation,
  GetAddressValidation,
  UpdateAddressValidation,
} from '../validation/address.validation.js';
import { GetContactValidation } from '../validation/contact.validation.js';
import { validate } from '../validation/validate.js';

async function create(user, contactId, request) {
  contactId = validate(GetContactValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  const address = validate(CreateAddressValidation, request);
  address.contact_id = contactId;

  return prisma.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
}

async function get(user, contactId, addressId) {
  contactId = validate(GetAddressValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  addressId = validate(GetAddressValidation, addressId);

  const address = await prisma.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, 'Address not found');
  }

  return address;
}

async function update(user, contactId, request) {
  contactId = validate(GetAddressValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  const address = validate(UpdateAddressValidation, request);

  const totalAddress = await prisma.address.count({
    where: {
      id: address.id,
    },
  });

  if (totalAddress < 1) {
    throw new ResponseError(404, 'Address not found');
  }

  await prisma.address.updateMany({
    where: {
      id: address.id,
    },
    data: {
      ...address,
    },
  });

  return address;
}

async function remove(user, contactId, addressId) {
  contactId = validate(GetAddressValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  addressId = validate(GetAddressValidation, addressId);

  const totalAddress = await prisma.address.count({
    where: {
      id: addressId,
    },
  });

  if (totalAddress < 1) {
    throw new ResponseError(404, 'Address not found');
  }

  return prisma.address.delete({
    where: {
      id: addressId,
    },
  });
}

async function list(user, contactId) {
  contactId = validate(GetAddressValidation, contactId);

  const totalContact = await prisma.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prisma.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
}

export default {
  create,
  get,
  update,
  remove,
  list,
};
