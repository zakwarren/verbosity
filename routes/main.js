const express = require('express');

const mainController = require('../controllers/main');
const validation = require('../validation/main');

const router = express.Router();

router.get('/', mainController.getHome);
router.get('/about', mainController.getAbout);
router.post('/analysis', validation.checkMain, mainController.postAnalysis);

module.exports = router;
