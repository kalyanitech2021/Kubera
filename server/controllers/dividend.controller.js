var express = require('express');
const Dividend = require('../models/dividend.model');
var router = express.Router();

// Add new dividend transactions
router.dividend_add = function(req, res) {
    let reqBody = req.body;
    console.log("Request : ",  JSON.stringify(reqBody));

    let dividends = new Dividend(reqBody);
    console.log("Response: ", JSON.stringify(dividends));

    dividends.save(function (err, dividends) {
        if (err) {
            console.log("Failed insert", err);
        } else {
            console.log("Successfully inserted record");
        }
      });  
    res.json(dividends);
};

// List/View all dividend transactions for a specific User
router.dividend_list_all = async function (req, res) {
    console.log("request ", req.params);
    let usrId = req.params.userId;
    console.log("login user id: ", usrId);

    let fetchedDividends = await Dividend.aggregate([{ $match : { user_id : usrId } }]);

    console.log("Fetched stocks -> " + JSON.stringify(fetchedDividends));
    res.json(fetchedDividends);
};

// List/View a specific dividend transaction
router.dividend_list_one = function (req, res) {
    Dividend.findById(req.params.id, function(err, dividends) {
        if (err) return next(err);
        res.json(dividends);
    });
};

// Update a specific dividend transaction
router.dividend_update = function (req, res) {
    let inputTransactionDate = req.body.transaction_date;
    let inputTransactionType = req.body.transaction_type;
    let inputSymbol = req.body.symbol;
    let inputExDivDate = req.body.ex_div_date;
    let inputRecordDate = req.body.record_date;
    let inputPaymentDate = req.body.payment_date;
    let inputDivPerShare = req.body.div_per_share;
    Dividend.findByIdAndUpdate(req.params.id, { $set: {
        transaction_date: inputTransactionDate, 
        transaction_type: inputTransactionType, 
        symbol: inputSymbol, 
        ex_div_date: inputExDivDate, 
        record_date: inputRecordDate,
        payment_date: inputPaymentDate,
        div_per_share: inputDivPerShare }}, 
        { multi: true, new: true }, function(err, dividends) {
        if (err) return next(err);
        res.json(dividends);
    });
};

// Delete a specific dividend transaction
router.dividend_delete_one = function (req, res) {
    Dividend.findByIdAndRemove(req.params.id, function(err, dividends) {
        if (err) return next(err);
        res.json(dividends);
    });
};

// Delete all dividend transactions
router.dividend_delete_all = function (req, res) {
    Dividend.remove({}, function (err, dividends) {
        if (err) return next(err);
        res.json(dividends);
    });
};

module.exports = router;