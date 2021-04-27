export class Portfolio {
    constructor(
        public user_id: String,
        public symbol: String,
        public purchasedDate: String,
        public totalQuantity: Number,
        public avgPrice: Number,
        public totalBuyCost: Number,
        public currentPrice: Number
      ) {  }
}

