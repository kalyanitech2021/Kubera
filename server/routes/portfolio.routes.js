var express = require('express');
const portfolioController = require('../controllers/portfolio.controller');
var router = express.Router();

// Get portfolio for a specific user
router.get('/:userId', portfolioController.getPortfolioForUser);

module.exports = router;