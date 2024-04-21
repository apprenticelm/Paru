const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const decoded = jwt?.verify(token, process.env.JWT_KEY);

    const authUser = await prisma?.user?.findFirst({
      where: {
        id: decoded?.userId,
        role: 'admin',
      },
    });

    if (authUser) {
      req.userData = authUser;
      next();
    } else {
      return res.status(401).json({
        message: 'Auth failed!',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Auth failed!',
    });
  }
};
