const express = require('express');
const router = express.Router();

const {healthCheck} = require('./controller');

router.get('/',healthCheck)


module.exports = router;