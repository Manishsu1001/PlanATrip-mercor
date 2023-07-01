const express = require('express');
const router = express.Router();

const {healthCheck, getQuestions, getPlaces} = require('./controller');

router.get('/',healthCheck)

router.get('/getQuestions',getQuestions);

router.post('/getPlaces',getPlaces);


module.exports = router;