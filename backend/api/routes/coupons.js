const express = require('express');
const router = express.Router();
const middlewares = require('../middleWeare/authMiddleware');
const couponControllers = require('../controllers/coupons');

router.post(
  '/create',
  middlewares({ roles: ['admin'] }),
  couponControllers?.addCoupon,
);

router.get(
  '/get-coupons',
  middlewares({ roles: ['admin'] }),
  couponControllers?.getCoupons,
);

router.delete(
  '/delete-coupon/:id',
  middlewares({ roles: ['admin'] }),
  couponControllers?.deleteCoupon,
);

router.get(
  '/coupon-by-code/:code',
  middlewares({ roles: ['user'] }),
  couponControllers?.getCouponByCode,
);
// get coupon by id
router.get(
  '/get-coupon/:id',
  middlewares({ roles: ['admin'] }),
  couponControllers?.getCouponById,
);

module.exports = router;
