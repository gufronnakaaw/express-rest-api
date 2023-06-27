import ContactService from '../services/ContactService.js';

async function create(req, res, next) {
  try {
    const result = await ContactService.create(req.user, req.body);

    res.status(200).json({
      success: true,
      data: result,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const result = await ContactService.get(req.user, req.params.contactId);
    res.status(200).json({
      success: true,
      data: result,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    req.body.id = req.params.contactId;
    const result = await ContactService.update(req.user, req.body);
    res.status(200).json({
      success: true,
      data: result,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

export default { create, get, update };
