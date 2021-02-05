var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    user_id: String,
    transaction_date: String,
    transaction_type: String,
    symbol: String,
    quantity: Number,
    price: Number
});

var Stock = mongoose.model('stock', stockSchema);

module.exports = Stock;