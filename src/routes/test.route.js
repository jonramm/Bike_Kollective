const express = require('express');
const router = express.Router();

const testController = require('../controllers/test.controller');

/* GET test. */
router.get('/', testController.get);

module.exports = router;