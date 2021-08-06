import Product from '../models/Product';

export const createProduct = async (req, res) => {
  const createdProduct = await Product.create(req.body);
  console.log({ createdProduct });
  res.status(201).json(createdProduct);
};
