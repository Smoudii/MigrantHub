const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const { controllerHandler } = require('../controllers/ControllerUtils');
const Event = require('../models/Event');

router.get('/', controllerHandler(EventController.getEvents, req => [req.query.editOwner]));
router.get('/:id', controllerHandler(EventController.getEvent, req => [req.query._id]));
router.post('/', EventController.upload.single('eventImage'),
  controllerHandler(EventController.createEvent, req => [req.user, req.body.eventDetails]));
router.put('/:id', ensureIsOwner(Event, true, true, true), EventController.upload.single('eventImage'),
  controllerHandler(EventController.updateEvent, req => [req.user, req.body.eventDetails]));
router.delete('/:id', ensureIsOwner(Event, true, true, true), controllerHandler(EventController.deleteEvent, req => [req.params.id]));

module.exports = router;
