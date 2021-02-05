var express = require('express');
const stockController = require('../controllers/stock.controller');
var router = express.Router();

// Add new stock transactions
router.post('/stocks', stockController.stock_add);

// List/View all stock transactions for a specific User
router.get('/stocks/:userId/list', stockController.stock_list_all);

// List/View a specific stock transaction
router.get('/stocks/:id', stockController.stock_list_one);

// Update a specific stock transaction
router.put('/stocks/:id/update', stockController.stock_update);

// Delete a specific stock transaction
router.delete('/stocks/:id/delete', stockController.stock_delete_one);

// Delete all stock transactions
router.delete('/stocks/delete', stockController.stock_delete_all);

module.exports = router;