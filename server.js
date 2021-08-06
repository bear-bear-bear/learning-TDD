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

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

export default app;
