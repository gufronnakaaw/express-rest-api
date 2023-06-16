import UserService from '../services/user.service.js';

async function register(req, res, next) {
  try {
    const result = await UserService.register(req.body);
    res.status(201).json({
      success: true,
      data: result,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
};
