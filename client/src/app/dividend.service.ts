import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dividend } from './dividend/dividend';

const dividendsUrl = "http://localhost:3000/api/dividend/dividends";

@Injectable({
  providedIn: 'root'
})
export class DividendService {

  dividend: Dividend = {
    _id: "",
    user_id: "",
    transaction_date: "",
    transaction_type: "Dividend",
    symbol: "",
    ex_div_date: "",
    record_date: "",
    payment_date: "",
    div_per_share: 0
  };

  constructor(private http: HttpClient) { }

  create(dividends) {
    return this.http.post(dividendsUrl, dividends);
  }

  getAll(userId) {
    return this.http.get(dividendsUrl + "/" + userId + "/list");
  }

  get(id) {
    return this.http.get(dividendsUrl + "/" + id);
  }

  deleteAll() {
    return this.http.delete(dividendsUrl + "/delete");
  }

  delete(id) {
    return this.http.delete(dividendsUrl + "/" + id + "/delete");
  }

  update(id, dividends) {
    return this.http.put(dividendsUrl + "/" + id + "/update", dividends)
  }
}
