var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dividendSchema = new Schema({
    user_id: String,
    transaction_date: String,
    transaction_type: String,
    symbol: String,
    ex_div_date: String,
    record_date: String,
    payment_date: String,
    div_per_share: Number
});

var Dividend = mongoose.model('dividend', dividendSchema);

module.exports = Dividend;