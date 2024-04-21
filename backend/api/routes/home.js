const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/home');
const middlewares = require('../middleWeare/authMiddleware');

router.get('/', userContollers.getAllImages);
router.post(
  '/',
  middlewares({ roles: ['admin'] }),
  userContollers.uploadImages,
);
router.delete(
  '/:id',
  middlewares({ roles: ['admin', 'user'] }),
  userContollers.removeImage,
);

module.exports = router;
