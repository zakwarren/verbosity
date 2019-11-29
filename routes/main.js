const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.getHome);
router.post('/analysis', mainController.postAnalysis);

module.exports = router;
