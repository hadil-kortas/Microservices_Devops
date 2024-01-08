const request = require('supertest');
const app = require('../server');

describe('Customers Service Tests', () => {
  beforeAll(async () => {
    // Any setup logic you might need
  });

  afterAll(async () => {
    // Any teardown logic you might need
  });

  test('GET /customers should return a list of customers', async () => {
    const response = await request(app).get('/customers');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /customer should add a new customer', async () => {
    const newCustomer = {
      name: 'New Customer4',
      email: 'newcustomer4@example.com',
      phone: '123-456-7890',
    };

    const response = await request(app)
      .post('/customer')
      .send(newCustomer);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('PUT /customer/:id should update an existing customer', async () => {
    // Assuming there is an existing customer with an ID
    const existingCustomerId = 1;
    const updatedCustomer = {
      name: 'Updated Customer',
      email: 'updatedcustomer@example.com',
      phone: '987-654-3210',
    };

    const response = await request(app)
      .put(`/customer/${existingCustomerId}`)
      .send(updatedCustomer);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('DELETE /customer/:id should delete an existing customer', async () => {
    // Assuming there is an existing customer with an ID
    const existingCustomerId = 1;

    const response = await request(app).delete(`/customer/${existingCustomerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });
});
