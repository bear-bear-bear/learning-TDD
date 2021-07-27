import express from 'express';
import dotenv from 'dotenv';

import abcRoutes from './routes';
import connectDB from './lib/connectDB';

dotenv.config();

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());
app.use('/api/abc', abcRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
