const request = require('supertest');
const app = require('../server');

describe('Orders Service Tests', () => {
  beforeAll(async () => {
    // Any setup logic you might need
  });

  afterAll(async () => {
    // Any teardown logic you might need
  });

  test('GET /orders should return a list of orders', async () => {
    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /order should add a new order', async () => {
    const newOrder = {
      customerId: 1,
      bookId: 1,
      quantity: 2,
      totalAmount: 30.0,
    };

    const response = await request(app)
      .post('/order')
      .send(newOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('PUT /order/:id should update an existing order', async () => {
    // Assuming there is an existing order with an ID
    const existingOrderId = 1;
    const updatedOrder = {
      customerId: 2,
      bookId: 3,
      quantity: 1,
      totalAmount: 15.0,
    };

    const response = await request(app)
      .put(`/order/${existingOrderId}`)
      .send(updatedOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('DELETE /order/:id should delete an existing order', async () => {
    // Assuming there is an existing order with an ID
    const existingOrderId = 1;

    const response = await request(app).delete(`/order/${existingOrderId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });
});

