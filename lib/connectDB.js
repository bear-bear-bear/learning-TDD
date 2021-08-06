import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function connectDB() {
  mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('[ MongoDB is Connected ]'))
    .catch((error) => {
      console.error('MongoDB Connect failed');
      console.error(error);
    });
}
