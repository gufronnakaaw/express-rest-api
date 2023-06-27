import supertest from 'supertest';
import { server } from '../utils/server.js';
import { logger } from '../utils/logging.js';
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from './test.util.js';

describe('POST /api/contacts', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can create new contact', async () => {
    const result = await supertest(server)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstname: 'test_first',
        lastname: 'test_last',
        email: 'test@mail.com',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstname).toBe('test_first');
    expect(result.body.data.lastname).toBe('test_last');
    expect(result.body.data.email).toBe('test@mail.com');
    expect(result.body.data.phone).toBe('081234345656');
    expect(result.body.errors).toBeNull();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(server)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        lastname: 'test_last',
        email: 'test@mail.com.error.adjklhasjkdh',
        phone: '08123434565asdasdkjhask6',
      });

    // logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'test');

    // logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstname).toBe(testContact.firstname);
    expect(result.body.data.lastname).toBe(testContact.lastname);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
    expect(result.body.errors).toBeNull();
  });

  it('should reject get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${testContact.id}`)
      .set('Authorization', 'wrongtoken');

    // logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should not found', async () => {
    const result = await supertest(server)
      .get(`/api/contacts/215546698785152`)
      .set('Authorization', 'test');

    // logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});

describe('PUT /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can update contact', async () => {
    const contact = await getTestContact();
    const result = await supertest(server)
      .put(`/api/contacts/${contact.id}`)
      .set('Authorization', 'test')
      .send({
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@mail.com',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.firstname).toBe('firstname');
    expect(result.body.data.lastname).toBe('lastname');
    expect(result.body.data.email).toBe('email@mail.com');
    expect(result.body.data.phone).toBe('081234345656');
    expect(result.body.errors).toBeNull();
  });

  it('should reject update if contactId is invalid', async () => {
    const result = await supertest(server)
      .put(`/api/contacts/wrong`)
      .set('Authorization', 'test')
      .send({
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@mail.com',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should not found', async () => {
    const result = await supertest(server)
      .put(`/api/contacts/4564646546`)
      .set('Authorization', 'test')
      .send({
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@mail.com',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should reject update if token is invalid', async () => {
    const contact = await getTestContact();

    const result = await supertest(server)
      .put(`/api/contacts/${contact.id}`)
      .set('Authorization', 'wrongtoken')
      .send({
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@mail.com',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should reject update if request is invalid', async () => {
    const contact = await getTestContact();

    const result = await supertest(server)
      .put(`/api/contacts/${contact.id}`)
      .set('Authorization', 'test')
      .send({
        firstname: '',
        lastname: 'lastname',
        email: 'email@mail.com.error',
        phone: '081234345656',
      });

    // logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});
