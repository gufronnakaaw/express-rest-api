import UserService from '../services/UserService.js';

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

async function login(req, res, next) {
  try {
    const result = await UserService.login(req.body);
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
    const username = req.user.username;
    const user = await UserService.get(username);

    res.status(200).json({
      success: true,
      data: user,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;

    const result = await UserService.update(request);
    res.status(200).json({
      success: true,
      data: result,
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
