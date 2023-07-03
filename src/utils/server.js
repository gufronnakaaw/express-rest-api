import express from 'express';
import UserRoute from '../routes/UserRoute.js';
import ContactRoute from '../routes/ContactRoute.js';
import ErrorMiddleware from '../middleware/ErrorMiddleware.js';

const server = express();
server.use(express.json());
server.use('/api/users', UserRoute);
server.use('/api/contacts', ContactRoute);
server.use(ErrorMiddleware);

export default server;
