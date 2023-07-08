import ResponseError from '../error/ResponseError.js';

function ErrorMiddleware(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    if (req.method == 'DELETE') {
      return res.status(err.status).json({
        success: false,
        errors: JSON.parse(err.message),
      });
    }

    return res.status(err.status).json({
      success: false,
      data: null,
      errors: JSON.parse(err.message),
    });
  }

  return res.status(500).json({
    success: false,
    data: null,
    errors: err.message,
  });
}

export default ErrorMiddleware;
