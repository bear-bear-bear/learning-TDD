import { createProduct } from '../../controllers/products';
import Product from "../../models/Product";

Product.create = jest.fn();

describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  });
  it('should call Product.create', () => {
    createProduct();
    expect(Product.create).toBeCalled();
  })
});
