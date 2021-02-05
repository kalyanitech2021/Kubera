export class Stock {
    constructor(
        public _id: String,
        public user_id: String,
        public transaction_date: String,
        public transaction_type: String,
        public symbol: String,
        public quantity: Number,
        public price: Number
        ) {  }
}