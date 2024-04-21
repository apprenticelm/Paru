const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/user');
const middlewares = require('../middleWeare/authMiddleware');
const adminAuthMiddleware = require('../middleWeare/adminAuthMiddleware');

//user Auth
router.get('/', middlewares({ roles: ['admin'] }), userContollers.getUsers);
router.delete(
  '/:id',
  middlewares({ roles: ['admin'] }),
  userContollers.deleteUser,
);
router.post('/signup', userContollers.userSignup);
router.post('/login', userContollers.userLogin);
router.post('/forgot-password', userContollers.forgotPassword);
router.post('/reset-password', userContollers.resetPassword);
router.post('/login', userContollers.userLogin);
router.get('/me', userContollers.findbyToken);
router.patch(
  '/update-profile/:id',
  middlewares({ roles: ['user', 'admin'] }),
  userContollers.updateProfile,
);
router.patch(
  '/update-admin-credentials',
  middlewares({ roles: ['admin'] }),
  userContollers.updateAdminCredentials,
);
router.get(
  '/:id',
  middlewares({ roles: ['admin'] }),
  userContollers.getUserById,
);

//user CRUD
// router.get('/:userId', userContollers.findOne);

module.exports = router;
