export class Dividend {
    constructor(
        public _id: String,
        public user_id: String,
        public transaction_date: String,
        public transaction_type: String,
        public symbol: String,
        public ex_div_date: String,
        public record_date: String,
        public payment_date: String,
        public div_per_share: Number
      ) {  }
}
