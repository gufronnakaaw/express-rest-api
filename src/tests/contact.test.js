import supertest from 'supertest';
import { server } from '../utils/server.js';
import { logger } from '../utils/logging.js';
import {
  createTestUser,
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

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});
