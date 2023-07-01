const express = require('express');
const router = express.Router();

const {healthCheck, getQuestions, getPlaces, createItinerary} = require('./controller');

router.get('/',healthCheck)

router.get('/getQuestions',getQuestions);

router.post('/getPlaces',getPlaces);

router.post('/createItinerary',createItinerary);

module.exports = router;