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

async function update(req, res, next) {
  try {
    req.body.id = req.params.addressesId;
    const data = await AddressService.update(
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

async function remove(req, res, next) {
  try {
    await AddressService.remove(
      req.user,
      req.params.contactId,
      req.params.addressesId
    );
    res.status(200).json({
      success: true,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const data = await AddressService.list(req.user, req.params.contactId);
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
  update,
  remove,
  list,
};
