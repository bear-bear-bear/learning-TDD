import Product from '../models/Product';

export const createProduct = (req, res, next) => {
  const createdProduct = Product.create(req.body);
  res.status(201).json(createdProduct);
};
