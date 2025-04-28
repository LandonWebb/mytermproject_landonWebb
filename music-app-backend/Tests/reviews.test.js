const request = require('supertest');
const app = require('../../app');

describe('GET /api/reviews', () => {
  it('should return all reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
