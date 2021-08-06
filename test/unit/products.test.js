import { createRequest } from 'node-mocks-http/lib/mockRequest';
import { createResponse } from 'node-mocks-http/lib/mockResponse';

import { createProduct } from '../../controllers/products';
import Product from '../../models/Product';
import mockProduct from '../mock-data/product.json';

Product.create = jest.fn();

// 1 - 강의에서 안내해 준 것
// let req, res, next;
// beforeEach(() => {
//   req = createRequest();
//   res = createResponse();
//   next = null;
// });

// 2 - 그냥 이렇게 하면 되는거 아닌가?
const req = createRequest();
const res = createResponse();
const next = null;

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
});
