var express = require('express');
const Stock = require('../models/stock.model');
var router = express.Router();

// Get Portfolio for user
router.getPortfolioForUser = async function (req, res) {
    console.log("request ", req.params);
    let usrId = req.params.userId;
    console.log("<PortfolioController>user id: ", usrId);

    let fetchedDocs = await Stock.aggregate([
        { $match : { 
          $and: [
            {user_id : usrId },
            {transaction_type : "Buy"}
          ]},
        },
        {   
            "$group" : 
            { "_id" : "$symbol",
              "purchasedDate": {$min: "$transaction_date"}, 
              "totalQuantity" : { "$sum" : "$quantity" },
              "avgPrice": { "$avg": "$price"},
              "totalBuyCost" : { "$sum" : { $multiply: [ "$price", "$quantity" ] } } } },
            { $sort: { _id: 1 }}
    ]);

    console.log("Fetched docs -> " + JSON.stringify(fetchedDocs));
    res.json(fetchedDocs);
};

module.exports = router;
