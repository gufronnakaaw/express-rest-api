import AddressService from '../services/AddressService.js';

async function create(req, res, next) {
  try {
    const data = await AddressService.create(
      req.user,
      req.params.contactId,
      req.body
    );
    res.status(200).json({
      success: true,
      data,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const data = await AddressService.get(
      req.user,
      req.params.contactId,
      req.params.addressesId
    );

    res.status(200).json({
      success: true,
      data,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  get,
};
