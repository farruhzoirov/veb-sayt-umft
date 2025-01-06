const router = require('express').Router()

const StatisticController = require('../controllers/statistics/statistics.controller');
const  authMiddleware  = require('../middlewares/auth.middleware');

const statisticController = new StatisticController();

router.get('/counts', authMiddleware.universalAccessMiddleware,  statisticController.ModelCounts);

module.exports = router;
