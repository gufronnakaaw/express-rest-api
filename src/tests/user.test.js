import supertest from 'supertest';
import server from '../utils/server.js';
import logger from '../utils/logging.js';
import { createTestUser, getTestUser, removeTestUser } from './test.util.js';
import bcrypt from 'bcrypt';

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

    // logger.info(result.body);

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

    // logger.info(result.body);

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

describe('GET /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(server)
      .get('/api/users/current')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
    expect(result.body.data.username).toBeDefined();
    expect(result.body.data.email).toBeDefined();
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(server)
      .get('/api/users/current')
      .set('Authorization', 'wrongtoken');

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        password: 'testpassword',
        email: 'test@gmail.com',
      });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
    expect(result.body.data.username).toBeDefined();
    expect(result.body.data.email).toBeDefined();

    const testUser = await getTestUser();
    expect(await bcrypt.compare('testpassword', testUser.password)).toBe(true);
  });

  it('should can update user email', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        email: 'test@gmail.com',
      });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
    expect(result.body.data.username).toBeDefined();
    expect(result.body.data.email).toBeDefined();
  });

  it('should can update user password', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'test')
      .send({
        password: 'testing',
      });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
    expect(result.body.data.username).toBeDefined();
    expect(result.body.data.email).toBeDefined();

    const testUser = await getTestUser();
    expect(await bcrypt.compare('testing', testUser.password)).toBe(true);
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(server)
      .patch('/api/users/current')
      .set('Authorization', 'wrongtoken')
      .send({
        password: 'testing',
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

describe('DELETE /api/users/logout', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    const result = await supertest(server)
      .delete('/api/users/logout')
      .set('Authorization', 'test');

    // logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('success');
    expect(result.body).not.toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();
  });

  it('should reject logout', async () => {
    const result = await supertest(server)
      .delete('/api/users/logout')
      .set('Authorization', 'wrongtoken');

    // logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('success');
    expect(result.body).not.toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeFalsy();
    expect(result.body.errors).toBeDefined();
  });
});
