import { createRequest } from 'node-mocks-http/lib/mockRequest';
import { createResponse } from 'node-mocks-http/lib/mockResponse';

import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../../controllers/products';
import Product from '../../models/Product';
import mockProduct from '../mock-data/product.json';
import mockProducts from '../mock-data/products.json';

// mock
Product.create = jest.fn();
Product.find = jest.fn();
Product.findById = jest.fn();
Product.findByIdAndUpdate = jest.fn();
Product.findByIdAndDelete = jest.fn();

let req, res, next;
beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});
const FAKE_PRODUCT_ID = "12345TEMPORARY";

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
  beforeEach(() => {
    req.params.productId = FAKE_PRODUCT_ID;
  });

  it('should have a getProductById', () => {
    expect(typeof getProductById).toBe('function');
  });

  it('should call Product.findByID', async () => {
    await getProductById(req, res, next);
    expect(Product.findById).toBeCalledWith(FAKE_PRODUCT_ID);
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

// update
describe('Product Controller Update', () => {
  beforeEach(() => {
    req.params.productId = FAKE_PRODUCT_ID;
    req.body = {
      name: 'updated name',
      description: 'updated description'
    };
  });

  it('should have a updateProduct', () => {
    expect(typeof updateProduct).toBe('function');
  });

  it('should call Product.findByIdAndUpdate', async () => {
    await updateProduct(req, res, next);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.productId,
        req.body,
        { new: true }
    );
  });

  it('should return json body in response code 200', async () => {
    Product.findByIdAndUpdate.mockReturnValue(req.body);
    await updateProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(req.body);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle 404 when item does not exist', async () => {
    Product.findByIdAndUpdate.mockReturnValue(null);
    await updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);
    Product.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

// delete
describe('Product Controller Delete', () => {
  beforeEach(() => {
    req.params.productId = FAKE_PRODUCT_ID;
    req.body = {
      name: 'deleted name',
      description: 'deleted description'
    };
  });

  it('should have a deleteProduct', () => {
    expect(typeof deleteProduct).toBe('function');
  });

  it('should call Product.findByIdAndDelete', async () => {
    await deleteProduct(req, res, next);
    expect(Product.findByIdAndDelete).toBeCalledWith(FAKE_PRODUCT_ID);
  });

  it('should return response code 200', async () => {
    Product.findByIdAndDelete.mockReturnValue(req.body);
    await deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(req.body);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle 404 when item does not exist', async () => {
    Product.findByIdAndDelete.mockReturnValue(null);
    await deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);
    Product.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
