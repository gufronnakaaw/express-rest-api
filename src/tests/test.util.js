import { prisma } from '../utils/database';
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

async function getTestContact() {
  return prisma.contact.findFirst({
    where: {
      username: 'test',
    },
  });
}

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContact,
  createTestContact,
  getTestContact,
};
