import express from 'express';
import abcRoutes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/abc', abcRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
