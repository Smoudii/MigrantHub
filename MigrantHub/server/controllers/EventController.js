const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const EventService = require('../service/EventService');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `uploads/${req.session.passport.user._id}/events/`;
    fs.ensureDirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {

  upload: multer({ storage: multerStorage }),

  async createEvent(user, eventObject, validationObject) {
    const parsedEventObj = qs.parse(eventObject);
    return EventService.createEvent(user, parsedEventObj, validationObject);
  },

  async getEvents(userId) {
    return EventService.getEvents(userId);
  },

  async getEvent(eventId) {
    return EventService.getEvent(eventId);
  },

  async updateEvent(user, eventObject, validationObject) {
    const parsedEventObject = qs.parse(eventObject);
    return EventService.updateEvent(user, parsedEventObject, validationObject);
  },

  async deleteEvent(eventId) {
    return EventService.deleteEvent(eventId);
  },
};
