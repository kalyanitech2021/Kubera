var express = require('express');
const Users = require('../models/users.model');
var router = express.Router();

// Add new users
router.users_add = function(req, res) {
    let reqBody = req.body;
    console.log("Request : ",  JSON.stringify(reqBody));

    let users = new Users(reqBody);
    console.log("Response: ", JSON.stringify(users));

    users.save(function (err, users) {
        if (err) {
            console.log("Failed insert", err);
        } else {
            console.log("Successfully inserted record");
        }
      });  
    res.json(users);
};

// List/View all users
router.users_list_all = function (req, res) {
    Users.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

// List/View a specific user
router.users_list_one = function (req, res) {
    Users.findById(req.params.id, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

module.exports = router;