import ContactService from '../services/ContactService.js';

async function create(req, res, next) {
  try {
    const data = await ContactService.create(req.user, req.body);

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
    const data = await ContactService.get(req.user, req.params.contactId);
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
    req.body.id = req.params.contactId;
    const data = await ContactService.update(req.user, req.body);
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
    await ContactService.remove(req.user, req.params.contactId);
    res.status(200).json({
      success: true,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function search(req, res, next) {
  try {
    const data = await ContactService.search(req.user, req.query);
    res.status(200).json({
      success: true,
      ...data,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

export default { create, get, update, remove, search };
