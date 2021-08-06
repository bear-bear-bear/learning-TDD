import request from 'supertest';

import app from '../../server';
import mockProduct from '../mock-data/product.json';

// create
it('POST /api/products', async () => {
  const { statusCode, body } = await request(app)
      .post('/api/products')
      .send(mockProduct);

  expect(statusCode).toBe(201);
  expect(body.name).toBe(mockProduct.name);
  expect(body.description).toBe(mockProduct.description);
});

it('should return 500 on POST /api/products', async () => {
  const { statusCode, body } = await request(app)
      .post('/api/products')
      .send({ name: mockProduct.name }); // Error: 'description' property is required

  expect(statusCode).toBe(500);
  expect(body).toStrictEqual({ message: 'Product validation failed: description: Path `description` is required.' });
});

// read
it('GET /api/products', async () => {
  const { statusCode, body } = await request(app).get('/api/products');

  expect(statusCode).toBe(200);
  expect(Array.isArray(body)).toBeTruthy();
  expect(body[0]?.name).toBeDefined();
  expect(body[0]?.description).toBeDefined();
});
