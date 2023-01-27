import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDatabase from './utils/connectDatabase.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

connectDatabase(() => console.log('Database Connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
