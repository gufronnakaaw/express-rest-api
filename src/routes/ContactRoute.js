import express from 'express';
import ContactController from '../controllers/ContactController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', AuthMiddleware, ContactController.create);
router.get('/:contactId', AuthMiddleware, ContactController.get);

export default router;
