const express = require('express');
const router = express.Router();
const middlewares = require('../middleWeare/authMiddleware');
const paymentControllers = require('../controllers/payment');

router.post(
  '/checkout/session',
  middlewares({ roles: ['user'] }),
  paymentControllers.createCheckoutSession,
);
router.post(
  '/create-checkout-intent',
  middlewares({ roles: ['user'] }),
  paymentControllers.createCheckoutIntent,
);
router.post(
  '/event/callback',
  middlewares({ roles: ['user'] }),
  paymentControllers.updateEventPayment,
);

router.post(
  '/register-free-ticket',
  middlewares({ roles: ['user'] }),
  paymentControllers.createFreeTicketRegistration,
);

router.get(
  '/payment-details',
  middlewares({ roles: ['user'] }),
  paymentControllers.paymentDetails,
);
router.get(
  '/all-payment-tickets',
  middlewares({ roles: ['user'] }),
  paymentControllers.allPaymentDetails,
);

router.get('/payment-verification/:id', paymentControllers.paymentVerification);

module.exports = router;
