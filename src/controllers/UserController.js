import UserService from '../services/UserService.js';

async function register(req, res, next) {
  try {
    const data = await UserService.register(req.body);
    res.status(201).json({
      success: true,
      data,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = await UserService.login(req.body);
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
    const data = await UserService.get(req.user.username);

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
    req.body.username = req.user.username;

    const data = await UserService.update(req.body);
    res.status(200).json({
      success: true,
      data,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await UserService.logout(req.user.username);
    res.status(200).json({
      success: true,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  get,
  update,
  logout,
};
