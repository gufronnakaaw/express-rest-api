import supertest from 'supertest';
import { server } from '../utils/server.js';
import { logger } from '../utils/logging.js';
import { createTestUser, removeTestUser } from './test.util.js';

describe('POST /api/users', function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(server).post('/api/users').send({
      username: 'test',
      password: 'test',
      email: 'test@mail.com',
    });

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.email).toBe('test@mail.com');
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(server).post('/api/users').send({
      username: '',
      password: '',
      email: '',
    });

    expect(result.status).toBe(400);
    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).not.toBeNull();
  });

  it('should reject if username already exists', async () => {
    let result = await supertest(server).post('/api/users').send({
      username: 'test',
      password: 'test',
      email: 'test@mail.com',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.email).toBe('test@mail.com');
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();

    result = await supertest(server).post('/api/users').send({
      username: 'test',
      password: 'test',
      email: 'test@mail.com',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).not.toBeNull();
  });
});

describe('POST /api/users/login', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'test',
      password: 'test',
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.data).toBeDefined();
    expect(result.body.errors).toBeNull();
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });

  it('should cant login if request is invalid', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: '',
      password: '',
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should cant login if password is invalid', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'test',
      password: 'wrongpassword',
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  it('should cant login if username is invalid', async () => {
    const result = await supertest(server).post('/api/users/login').send({
      username: 'wrongusername',
      password: 'test',
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});
