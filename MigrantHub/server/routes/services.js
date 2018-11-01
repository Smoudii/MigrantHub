var express = require('express');
var router = express.Router();
var servicesController = require('../controllers/servicesController');

router.post('/create', servicesController.upload.single('serviceImage'), servicesController.createService);
router.get('/view/all/', servicesController.viewServices);

module.exports = router;