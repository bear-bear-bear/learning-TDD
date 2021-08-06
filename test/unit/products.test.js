import { createRequest } from 'node-mocks-http/lib/mockRequest';
import { createResponse } from 'node-mocks-http/lib/mockResponse';

import { createProduct, getProducts, getProductById } from '../../controllers/products';
import Product from '../../models/Product';
import mockProduct from '../mock-data/product.json';
import mockProducts from '../mock-data/products.json';

// mock
Product.create = jest.fn();
Product.find = jest.fn();
Product.findById = jest.fn();

let req, res, next;
beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});
const PRODUCT_ID = "12345TEMPORARY";

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

describe('Product Controller GetById', () => {
  it('should have a getProductById', () => {
    expect(typeof getProductById).toBe('function');
  });

  it('should call Product.findByID', async () => {
    req.params.productId = PRODUCT_ID;
    await getProductById(req, res, next);
    expect(Product.findById).toBeCalledWith(PRODUCT_ID);
  });

  it('should return json body in response code 200', async () => {
    Product.findById.mockReturnValue(mockProduct);
    await getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(mockProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return 404 when item does not exist', async () => {
    Product.findById.mockReturnValue(null);
    await getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);
    Product.findById.mockReturnValue(rejectedPromise);
    await getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});