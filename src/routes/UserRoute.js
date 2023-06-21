import express from 'express';
import UserController from '../controllers/UserController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', UserController.register);
router.post('/login', UserController.login);

router.get('/current', AuthMiddleware, UserController.get);
router.patch('/current', AuthMiddleware, UserController.update);

export default router;
