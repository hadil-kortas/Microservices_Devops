const request = require('supertest');
const app = require('../server'); 

describe('API Gateway Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the API Gateway!');
  });
  
});
