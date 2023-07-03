import prisma from '../utils/database.js';
import bcrypt from 'bcrypt';

async function removeTestUser() {
  await prisma.user.deleteMany({
    where: {
      username: 'test',
    },
  });
}

async function createTestUser() {
  await prisma.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('test', 10),
      email: 'test@mail.com',
      token: 'test',
    },
  });
}

async function getTestUser() {
  return prisma.user.findUnique({
    where: {
      username: 'test',
    },
  });
}

async function removeAllTestContact() {
  return prisma.contact.deleteMany({
    where: {
      username: 'test',
    },
  });
}

async function createTestContact() {
  await prisma.contact.create({
    data: {
      username: 'test',
      firstname: 'test',
      lastname: 'test',
      email: 'test@mail.com',
      phone: '081234345656',
    },
  });
}

async function createManyTestContacts() {
  for (let i = 1; i <= 15; i++) {
    await prisma.contact.create({
      data: {
        username: `test`,
        firstname: `test ${i}`,
        lastname: `test ${i}`,
        email: `test${i}@mail.com`,
        phone: `08123434565${i}`,
      },
    });
  }
}

async function getTestContact() {
  return prisma.contact.findFirst({
    where: {
      username: 'test',
    },
  });
}

async function removeAllTestAddresses() {
  await prisma.address.deleteMany({
    where: {
      contact: {
        username: 'test',
      },
    },
  });
}

async function createTestAddresses() {
  const contact = await getTestContact();
  await prisma.address.create({
    data: {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postal_code: '12345',
      contact_id: contact.id,
    },
  });
}

async function getTestAddresses() {
  return prisma.address.findFirst({
    where: {
      contact: {
        username: 'test',
      },
    },
  });
}

async function createManyTestAddresses() {
  const contact = await getTestContact();
  for (let i = 1; i <= 15; i++) {
    await prisma.address.create({
      data: {
        street: `street ${i}`,
        city: `city ${i}`,
        province: `province ${i}`,
        country: `country ${i}`,
        postal_code: `12345${i}`,
        contact_id: contact.id,
      },
    });
  }
}

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContact,
  createTestContact,
  getTestContact,
  createManyTestContacts,
  removeAllTestAddresses,
  getTestAddresses,
  createTestAddresses,
  createManyTestAddresses,
};
