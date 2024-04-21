const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = ({ roles }) => {
  return async (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      const decoded = jwt?.verify(token, process.env.JWT_KEY);

      const authUser = await prisma?.user?.findFirst({
        where: {
          id: decoded?.userId,
          deleted: false,
        },
      });
      if (!authUser) {
        return res.status(403).json({
          message: 'Invalid token.User not Exist!',
        });
      }

      if (!roles.includes(authUser?.role)) {
        return res.status(401).json({
          message: 'No permission!',
        });
      }

      if (authUser) {
        req.userData = authUser;
        next();
      } else {
        return res.status(401).json({
          message: 'Auth failed 248',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: 'Auth failed 123',
      });
    }
  };
};
