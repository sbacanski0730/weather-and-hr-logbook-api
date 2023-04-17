import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import connectDatabase from './utils/connectDatabase.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  exposedHeaders: 'token',
};

app.use(cors(corsOptions));
app.options('*', cors());

// https://www.youtube.com/watch?v=S8kmHtQeflo

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WH-Logbook',
      version: '1.0',
      description: 'DESCRIPTION',
    },
    server: [{ url: 'http://localhost:5014/' }],
  },
  apis: ['./controller/*.js', './models/*.js', './routes/*.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/report', reportRoutes);

// eslint-disable-next-line no-console
connectDatabase(() => console.log('Database Connected'));

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
