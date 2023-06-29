import { ResponseError } from '../error/ResponseError.js';
import { prisma } from '../utils/database.js';
import { CreateAddressValidation } from '../validation/address.validation.js';
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

export default {
  create,
};
