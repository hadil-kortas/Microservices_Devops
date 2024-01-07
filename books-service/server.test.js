const request = require('supertest');
const app = require('./server');

describe('Book Service Tests', () => {
  beforeAll(async () => {
    // Any setup logic you might need
  });

  afterAll(async () => {
    // Any teardown logic you might need
  });

  test('GET /books should return a list of books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /book should add a new book', async () => {
    const newBook = {
      title: 'Book',
      author: 'Name',
      publicationYear: 2022,
    };

    const response = await request(app)
      .post('/book')
      .send(newBook);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('PUT /book/:id should update an existing book', async () => {
    // Assuming there is an existing book with an ID
    const existingBookId = 1;
    const updatedBook = {
      title: 'Updated Book',
      author: 'Updated Author',
      publicationYear: 2023,
    };

    const response = await request(app)
      .put(`/book/${existingBookId}`)
      .send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });

  test('DELETE /book/:id should delete an existing book', async () => {
    // Assuming there is an existing book with an ID
    const existingBookId = 1;

    const response = await request(app).delete(`/book/${existingBookId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "message": "success" });
  });
});
