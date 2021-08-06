import express from 'express';
import dotenv from 'dotenv';

import connectDB from './lib/connectDB';
import productsRouter from "./routes";

dotenv.config();

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
