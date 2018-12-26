const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const { controllerHandler, validationObjectHandler } = require('../controllers/ControllerUtils');
const Event = require('../models/Event');
const { validateEvent } = require('../validators/EventValidator');

router.get('/', controllerHandler(EventController.getEvents, req => [req.query.editOwner]));
router.get('/:id', controllerHandler(EventController.getEvent, req => [req.query._id]));
router.post('/', EventController.upload.single('eventImage'), validationObjectHandler , validateEvent,
  controllerHandler(EventController.createEvent, req => [req.user, req.body, req]));
router.put('/:id', ensureIsOwner(Event, true, true, true), EventController.upload.single('eventImage'), validationObjectHandler, validateEvent,
  controllerHandler(EventController.updateEvent, req => [req.user, req.body.eventDetails, req]));
router.delete('/:id', ensureIsOwner(Event, true, true, true), controllerHandler(EventController.deleteEvent, req => [req.params.id]));

module.exports = router;
