var express = require('express');
const usersController = require('../controllers/users.controller');
var router = express.Router();

// Add new users
router.post('/', usersController.users_add);

// List/View all users
router.get('/', usersController.users_list_all);

// List/View a specific user
router.get('/:id', usersController.users_list_one);

module.exports = router;