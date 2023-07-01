import express from 'express';
import ContactController from '../controllers/ContactController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import AddressController from '../controllers/AddressController.js';

const router = express.Router();

router.post('/', AuthMiddleware, ContactController.create);
router.get('/:contactId', AuthMiddleware, ContactController.get);
router.put('/:contactId', AuthMiddleware, ContactController.update);
router.delete('/:contactId', AuthMiddleware, ContactController.remove);
router.get('/', AuthMiddleware, ContactController.search);
router.post('/:contactId/addresses', AuthMiddleware, AddressController.create);
router.get(
  '/:contactId/addresses/:addressesId',
  AuthMiddleware,
  AddressController.get
);
router.put(
  '/:contactId/addresses/:addressesId',
  AuthMiddleware,
  AddressController.update
);

export default router;
