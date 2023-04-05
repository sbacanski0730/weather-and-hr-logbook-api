import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import connectDatabase from './utils/connectDatabase.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  exposedHeaders: 'token',
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// eslint-disable-next-line no-console
connectDatabase(() => console.log('Database Connected'));

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
