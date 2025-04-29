const request = require('supertest');
const app = require('../app');

describe('User API Endpoints', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword'
  };

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/register')
      .send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully.');
  });

  it('should not register an existing user', async () => {
    const res = await request(app)
      .post('/register')
      .send(testUser); // sending same user again

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
