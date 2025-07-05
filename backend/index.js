import userRouter from './routes/userRouter.js';
import transactionRouter from './routes/transactionRoutes.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { swaggerUi, swaggerSpec } from './swagger/swaggerConfig.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//  Serve static files from uploads
app.use('/uploads',express.static('uploads'));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB is Connected Successfully'))
  .catch(err => console.error('MongoDb connection error: ', err));

// Routes
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is Running at Port ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
