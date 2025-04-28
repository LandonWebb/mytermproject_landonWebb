import request from 'supertest';
import app from '../../app.js'; // Adjust path if needed

describe('POST /register', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: `testuser_${Date.now()}@example.com`, // Unique email
        password: 'testpassword123'
      });

    expect(res.statusCode).toBe(201); // Expect HTTP 201 Created
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should fail registration when missing fields', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: '',
        email: '',
        password: ''
      });

    expect(res.statusCode).toBe(400); // Expect Bad Request
    expect(res.body).toHaveProperty('error', 'Username, email, and password are required');
  });
});
