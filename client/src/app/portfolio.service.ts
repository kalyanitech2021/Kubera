import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Portfolio } from './portfolio/portfolio';

const portfolioUrl = "http://localhost:3000/api/portfolio";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  portfolio: Portfolio = {
    user_id: "",
    symbol: "",
    purchasedDate: "",
    totalQuantity: 0,
    avgPrice: 0,
    totalBuyCost: 0,
    currentPrice: 0
  };

  constructor(private http: HttpClient) { }

  get(userId) {
    return this.http.get(portfolioUrl + "/" + userId);
  }
}