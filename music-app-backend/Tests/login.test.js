const request = require('supertest');
const app = require('../../app'); // Corrected import

describe('Login Routes', () => {
  let testEmail = `loginuser_${Date.now()}@example.com`;

  beforeAll(async () => {
    // Register a user first so we can login
    await request(app)
      .post('/register')
      .send({
        username: 'loginuser',
        email: testEmail,
        password: 'testpassword'
      });
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testEmail,
        password: 'testpassword'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: testEmail,
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid email or password');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: '',
        password: ''
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email and password are required');
  });
});
