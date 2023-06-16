import express from 'express';
import UserRoute from '../routes/UserRoute.js';
import { ErrorMiddleware } from '../middleware/ErrorMiddleware.js';

export const server = express();
server.use(express.json());
server.use('/api/users', UserRoute);
server.use(ErrorMiddleware);
