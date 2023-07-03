import prisma from '../utils/database.js';

async function AuthMiddleware(req, res, next) {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      errors: 'Unauthorized',
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      token,
    },
  });

  if (!user) {
    if (req.method === 'DELETE') {
      return res.status(401).json({
        success: false,
        errors: 'Unauthorized',
      });
    }

    return res.status(401).json({
      success: false,
      data: null,
      errors: 'Unauthorized',
    });
  }

  req.user = user;
  next();
}

export default AuthMiddleware;
