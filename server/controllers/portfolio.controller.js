var express = require('express');
const https = require('https');
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
  //console.log("Symbol: ", JSON.stringify(fetchedDocs._id));

  let options = new URL("https://api.polygon.io/v1/open-close/AAPL/2021-03-18?unadjusted=true&apiKey=pmBa8aocPfpKZbUijR8JIECmjmruDBqH")

  let myRequest = https.request(options, res => {
      let data = "";

      res.on("data", d => {
        data += d;
      })
      res.on("end", () => {
        console.log("data: ", data);
      })
    }
  )
  .end();
    
  res.json(fetchedDocs);
};

module.exports = router;

//https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MRNA&outputsize=compact&interval=60min&apikey=K6ZF68H2QZHCO20U

// https://api.polygon.io/v1/open-close/AAPL/2021-03-18?unadjusted=true&apiKey=pmBa8aocPfpKZbUijR8JIECmjmruDBqH