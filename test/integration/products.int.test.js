import request from 'supertest';

import app from '../../server';
import mockProduct from '../mock-data/product.json';

let firstProduct; // Will set real product at 'GET /api/products' test, and use at 'GET /api/products/:productId'
const FAKE_PRODUCT_ID = '610cfff4be57ab1694bfe64e'; // Must be similar to real product id

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

  firstProduct = body[0];
});

it('GET /api/products/:productId', async () => {
  const { statusCode, body } = await request(app).get(`/api/products/${firstProduct._id}`);

  expect(statusCode).toBe(200);
  expect(body.name).toBe(firstProduct.name);
  expect(body.description).toBe(firstProduct.description);
});

it('GET id does not exist /api/products/:productId', async () => {
  const { statusCode } = await request(app).get(`/api/products/${FAKE_PRODUCT_ID}`);

  expect(statusCode).toBe(404);
});