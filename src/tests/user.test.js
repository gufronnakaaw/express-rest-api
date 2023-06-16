import supertest from 'supertest';
import { server } from '../utils/server.js';
import { prisma } from '../utils/database.js';
import { logger } from '../utils/logging.js';

describe('POST /api/users', function () {
  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        username: 'anonymous',
      },
    });
  });

  it('should can register new user', async () => {
    const result = await supertest(server).post('/api/users').send({
      username: 'anonymous',
      password: 'rahasiabangetpokoknya',
      email: 'anonymous@mail.com',
    });

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe('anonymous');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.email).toBe('anonymous@mail.com');
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
      username: 'anonymous',
      password: 'rahasiabangetpokoknya',
      email: 'anonymous@mail.com',
    });

    logger.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe('anonymous');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.email).toBe('anonymous@mail.com');
    expect(result.body).toHaveProperty('success');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('errors');

    expect(result.body.success).toBeTruthy();
    expect(result.body.errors).toBeNull();

    result = await supertest(server).post('/api/users').send({
      username: 'anonymous',
      password: 'rahasiabangetpokoknya',
      email: 'anonymous@mail.com',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).not.toBeNull();
  });
});
