import supertest from 'supertest';
import { server } from '../utils/server.js';
import { logger } from '../utils/logging.js';

import {
  createTestAddresses,
  createTestContact,
  createTestUser,
  getTestAddresses,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContact,
  removeTestUser,
} from './test.util.js';

describe('POST /api/contacts/:contactId/addresses', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can create address', async () => {
    const contact = await getTestContact();

    const create = {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postal_code: '12345',
    };

    const result = await supertest(server)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('Authorization', 'test')
      .send(create);

    // logger.info(result.body);

    expect(result.status).toBe(200);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe(create.street);
    expect(result.body.data.city).toBe(create.city);
    expect(result.body.data.province).toBe(create.province);
    expect(result.body.data.country).toBe(create.country);
    expect(result.body.data.postal_code).toBe(create.postal_code);
    expect(result.body.errors).toBeNull();
  });

  it('should can create address if street, city, province is empty', async () => {
    const contact = await getTestContact();

    const create = {
      country: 'country test',
      postal_code: '12345',
    };

    const result = await supertest(server)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('Authorization', 'test')
      .send(create);

    // logger.info(result.body);

    expect(result.status).toBe(200);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBeNull();
    expect(result.body.data.city).toBeNull();
    expect(result.body.data.province).toBeNull();
    expect(result.body.data.country).toBe(create.country);
    expect(result.body.data.postal_code).toBe(create.postal_code);
    expect(result.body.errors).toBeNull();
  });

  it('should reject if request is invalid', async () => {
    const contact = await getTestContact();

    const create = {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: '',
      postal_code: '',
    };

    const result = await supertest(server)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('Authorization', 'test')
      .send(create);

    // logger.info(result.body);

    expect(result.status).toBe(400);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if token is invalid', async () => {
    const contact = await getTestContact();

    const create = {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postal_code: '12345',
    };

    const result = await supertest(server)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('Authorization', 'wrongtoken')
      .send(create);

    // logger.info(result.body);

    expect(result.status).toBe(401);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if contactId is invalid', async () => {
    const create = {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postal_code: '12345',
    };

    const result = await supertest(server)
      .post(`/api/contacts/wrongparams/addresses`)
      .set('Authorization', 'test')
      .send(create);

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
    const create = {
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postal_code: '12345',
    };

    const result = await supertest(server)
      .post(`/api/contacts/1832801283912/addresses`)
      .set('Authorization', 'test')
      .send(create);

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

describe('GET /api/contacts/:contactId/addresses/:addressesId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddresses();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can get address', async () => {
    const contact = await getTestContact();
    const address = await getTestAddresses();

    const result = await supertest(server)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('Authorization', 'test');

    // logger.info(result.body);

    expect(result.status).toBe(200);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe(address.street);
    expect(result.body.data.city).toBe(address.city);
    expect(result.body.data.province).toBe(address.province);
    expect(result.body.data.country).toBe(address.country);
    expect(result.body.data.postal_code).toBe(address.postal_code);
    expect(result.body.errors).toBeNull();
  });

  it('should cannot get address if contactId not found', async () => {
    const address = await getTestAddresses();

    const result = await supertest(server)
      .get(`/api/contacts/234131323513/addresses/${address.id}`)
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

  it('should cannot get address if addressesId not found', async () => {
    const contact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${contact.id}/addresses/5245454`)
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

  it('should reject get address if contactId & addressesId is invalid', async () => {
    const result = await supertest(server)
      .get(`/api/contacts/askjdhkajsd/addresses/asjkdhaskjdh`)
      .set('Authorization', 'test');

    // logger.info(result.body);

    expect(result.status).toBe(400);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should reject get address if token is invalid', async () => {
    const address = await getTestAddresses();
    const contact = await getTestContact();

    const result = await supertest(server)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('Authorization', 'wrong token');

    // logger.info(result.body);

    expect(result.status).toBe(401);

    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});
