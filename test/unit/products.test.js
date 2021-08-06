import { createRequest } from 'node-mocks-http/lib/mockRequest';
import { createResponse } from 'node-mocks-http/lib/mockResponse';

import { createProduct, getProducts } from '../../controllers/products';
import Product from '../../models/Product';
import mockProduct from '../mock-data/product.json';
import mockProducts from '../mock-data/products.json';

// mock
Product.create = jest.fn();
Product.find = jest.fn();

const req = createRequest();
const res = createResponse();
const next = jest.fn();

// create
describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = mockProduct;
  });

  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  });

  it('should call Product.create', async () => {
    await createProduct(req, res, next);
    expect(Product.create).toBeCalledWith(mockProduct);
  });

  it('should return 201 response code', async () => {
    await createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    Product.create.mockReturnValue(mockProduct);
    await createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(mockProduct);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    Product.create.mockReturnValue(rejectedPromise);
    await createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

// read
describe('Product Controller Get', () => {
  it('should have a getProducts function', () => {
    expect(typeof getProducts).toBe('function');
  });

  it('should call Product.find({})', async () => {
    await getProducts(req, res, next);
    expect(Product.find).toHaveBeenCalledWith({});
  });

  it('should return 200 response', async () => {
    await getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    Product.find.mockReturnValue(mockProducts);
    await getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(mockProducts);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectedPromise = Promise.reject(errorMessage);
    Product.find.mockReturnValue(rejectedPromise);
    await getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
