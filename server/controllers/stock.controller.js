var express = require('express');
const Stock = require('../models/stock.model');
var router = express.Router();

// Add new stock transactions
router.stock_add = function(req, res) {
    let reqBody = req.body;
    console.log("Request : ",  JSON.stringify(reqBody));

    let stocks = new Stock(reqBody);
    console.log("Response: ", JSON.stringify(stocks));

    stocks.save(function (err, stocks) {
        if (err) {
            console.log("Failed insert", err);
        } else {
            console.log("Successfully inserted record");
        }
      });  
    res.json(stocks);
};

// List/View all stock transactions for a specific User
router.stock_list_all = async function (req, res) {
    console.log("request ", req.params);
    let usrId = req.params.userId;
    console.log("login user id: ", usrId);

    let fetchedStocks = await Stock.aggregate([{ $match : { user_id : usrId } }]);

    console.log("Fetched stocks -> " + JSON.stringify(fetchedStocks));
    res.json(fetchedStocks);
};

// List/View a specific stock transaction
router.stock_list_one = function (req, res) {
    console.log("request ", req.params);

    Stock.findById(req.params.id, function(err, stocks) {
        if (err) return next(err);
        res.json(stocks);
    });
};

// Update a specific stock transaction
router.stock_update = function (req, res) {
    let inputTransactionDate = req.body.transaction_date;
    let inputTransactionType = req.body.transaction_type;
    let inputSymbol = req.body.symbol;
    let inputQuantity = req.body.quantity;
    let inputPrice = req.body.price;
    Stock.findByIdAndUpdate(req.params.id, { $set: { 
        transaction_date: inputTransactionDate, 
        transaction_type: inputTransactionType, 
        symbol: inputSymbol, 
        quantity: inputQuantity, 
        price: inputPrice }}, 
        { multi: true, new: true }, function(err, stocks) {
        if (err) return next(err);
        res.json(stocks);
    });
};

// Delete a specific stock transaction
router.stock_delete_one = function (req, res) {  
    Stock.findByIdAndRemove(req.params.id, function(err, stocks) {
        if (err) return next(err);
        res.json(stocks);
    });
};

// Delete all stock transactions
router.stock_delete_all = function (req, res) {
    Stock.remove({}, function (err, stocks) {
        if (err) return next(err);
        res.json(stocks);
    });
};

module.exports = router;