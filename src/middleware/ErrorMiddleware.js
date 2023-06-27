import { ResponseError } from '../error/ResponseError.js';

function ErrorMiddleware(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    if (req.method == 'DELETE') {
      res
        .status(err.status)
        .json({
          success: false,
          errors: err.message,
        })
        .end();
    } else {
      res
        .status(err.status)
        .json({
          success: false,
          data: null,
          errors: err.message,
        })
        .end();
    }
  } else {
    res
      .status(500)
      .json({
        success: false,
        data: null,
        errors: err.message,
      })
      .end();
  }
}

export { ErrorMiddleware };
