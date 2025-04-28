import request from 'supertest';
import app from '../../app.js';

describe('Auth Routes', () => {
  let testEmail = `testuser_${Date.now()}@example.com`;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: testEmail,
        password: 'testpassword',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register with missing fields', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: '',
        email: '',
        password: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Username, email, and password are required');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testEmail,
        password: 'testpassword',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testEmail,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid email or password');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: '',
        password: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email and password are required');
  });
});
