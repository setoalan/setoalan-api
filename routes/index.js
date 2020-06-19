const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

router.get('/api/v0/getWeeklyChartList', musicController.getWeeklyChartList);

module.exports = router;
