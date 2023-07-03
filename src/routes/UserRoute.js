import express from 'express';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', UserController.register);
router.post('/login', UserController.login);

router.use(AuthMiddleware);

router.get('/current', UserController.get);
router.patch('/current', UserController.update);
router.delete('/logout', UserController.logout);

export default router;
