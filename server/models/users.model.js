var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user_id: String,
    password: String,
    firstname: String,
    lastname: String
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;