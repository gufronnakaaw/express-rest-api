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

export default { create };
