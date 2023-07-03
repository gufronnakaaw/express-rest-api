import express from 'express';
import ContactController from '../controllers/ContactController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import AddressController from '../controllers/AddressController.js';

const router = express.Router();

router.use(AuthMiddleware);

router.get('/', ContactController.search);
router.post('/', ContactController.create);

router.get('/:contactId', ContactController.get);
router.put('/:contactId', ContactController.update);
router.delete('/:contactId', ContactController.remove);

router.get('/:contactId/addresses', AddressController.list);
router.post('/:contactId/addresses', AddressController.create);

router.get('/:contactId/addresses/:addressesId', AddressController.get);
router.put('/:contactId/addresses/:addressesId', AddressController.update);
router.delete('/:contactId/addresses/:addressesId', AddressController.remove);

export default router;
