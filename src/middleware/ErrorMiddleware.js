import ResponseError from '../error/ResponseError.js';

function ErrorMiddleware(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    if (req.method == 'DELETE') {
      return res.status(err.status).json({
        success: false,
        errors: err.message,
      });
    }

    return res.status(err.status).json({
      success: false,
      data: null,
      errors: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    data: null,
    errors: err.message,
  });
}

export default ErrorMiddleware;
