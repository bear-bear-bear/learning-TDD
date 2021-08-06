import Product from '../models/Product';

export const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
