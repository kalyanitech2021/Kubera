var express = require('express');
const dividendController = require('../controllers/dividend.controller');
var router = express.Router();

// Add new dividend transactions
router.post('/dividends', dividendController.dividend_add);

// List/View all dividend transactions for a specific User
router.get('/dividends/:userId/list', dividendController.dividend_list_all);

// List/View a specific dividend transaction
router.get('/dividends/:id', dividendController.dividend_list_one);

// Update a specific dividend transaction
router.put('/dividends/:id/update', dividendController.dividend_update);

// Delete a specific dividend transaction
router.delete('/dividends/:id/delete', dividendController.dividend_delete_one);

// Delete all dividend transactions
router.delete('/dividends/delete', dividendController.dividend_delete_all);


module.exports = router;