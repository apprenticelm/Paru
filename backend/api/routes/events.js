const express = require('express');
const router = express.Router();
const middlewares = require('../middleWeare/authMiddleware');
const eventControllers = require('../controllers/events');
const adminAuthMiddleware = require('../middleWeare/adminAuthMiddleware');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: './upload' });

//get
router.get('/instructors-modules', eventControllers?.instructorsAndModules);
router.get(
  '/admin-register-events',
  middlewares({ roles: ['admin'] }),
  eventControllers?.registeredAdminEvents,
);

//post

router.post(
  '/create',
  middlewares({ roles: ['user'] }),
  eventControllers?.create,
);
router.post(
  '/create-additional',
  middlewares({ roles: ['user'] }),
  multipartyMiddleware,
  eventControllers?.createAdditional,
);
router.post(
  '/proceed-with-payment',
  //middlewares({ roles: ['user'] }), 
  eventControllers?.proceedWithPayment,
);
router.post(
  '/registration',
  middlewares({ roles: ['user'] }),
  eventControllers?.registration,
);

//patch
router.post(
  '/update/:eventId',
  middlewares({ roles: ['user', 'admin'] }),
  eventControllers?.update,
);
router.post(
  '/edit-additional-event/:eventId',
  middlewares({ roles: ['user', 'admin'] }),
  multipartyMiddleware,
  eventControllers?.editAdditionalEvent,
);

//delete
router.delete(
  '/delete',
  middlewares({ roles: ['user'] }),
  eventControllers?.deleteEvents,
);

router.delete(
  '/delete-additional-event-file/:id',
  middlewares({ roles: ['user', 'admin'] }),
  eventControllers?.deleteAdditionalEventFile,
);
router.delete(
  '/admin-event-delete',
  middlewares({ roles: ['admin'] }),
  eventControllers?.deleteAdminEvents,
);

router.get(
  '/admin-events',
  middlewares({ roles: ['admin'] }),
  eventControllers?.eventsForAdmin,
);

router.get(
  '/event-by-module/:moduleName',
  eventControllers?.getEventsWithModules,
);
router.get('/event-by-id/:id', eventControllers?.getEventsById);
router.get(
  '/is-already-registered/:id',
  middlewares({ roles: ['user', 'admin'] }),
  eventControllers?.getAlreadyRegisteredEvent,
);
router.get(
  '/registered-event-details/:id',
  middlewares({ roles: ['user', 'admin'] }),
  eventControllers?.getRegisteredEventDetails,
);
router.get('/modules/:nowDate', eventControllers?.modules);

router.get('/:nowDate', eventControllers?.events);

module.exports = router;
