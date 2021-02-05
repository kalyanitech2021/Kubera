import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Stock } from './stock/stock';

const stocksUrl = "http://localhost:3000/api/stock/stocks";

@Injectable({
  providedIn: 'root'
})

export class StockService {

  stock: Stock = {
    _id: "",
    user_id: "",
    transaction_date: "",
    transaction_type: "",
    symbol: "",
    quantity: 0,
    price: 0
  };

  constructor(private http: HttpClient) { }

  create(stocks) {
    return this.http.post(stocksUrl, stocks);
  }

  getAll(userId) {
    return this.http.get(stocksUrl + "/" + userId + "/list");
  }

  get(id) {
    return this.http.get(stocksUrl + "/" + id);
  }

  deleteAll() {
    return this.http.delete(stocksUrl + "/delete");
  }

  delete(id) {
    return this.http.delete(stocksUrl + "/" + id + "/delete");
  }

  update(id, stocks) {
    return this.http.put(stocksUrl + "/" + id + "/update", stocks)
  }
}
