import { prisma } from '../utils/database.js';

async function AuthMiddleware(req, res, next) {
  const token = req.get('Authorization');
  if (!token) {
    res
      .status(401)
      .json({
        success: false,
        data: null,
        errors: 'Unauthorized',
      })
      .end();
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token,
      },
    });

    if (!user) {
      res
        .status(401)
        .json({
          success: false,
          data: null,
          errors: 'Unauthorized',
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
}

export { AuthMiddleware };
