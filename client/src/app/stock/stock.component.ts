import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock/stock';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

  types = ['Buy', 'Sell'];

  model: any = [];

  stock: Stock = {
    _id: "",
    user_id: this.value,
    transaction_date: "",
    transaction_type: "",
    symbol: "",
    quantity: 0,
    price: 0
  };

  ngOnInit(): void {
  }

  addStock() {
    
    const stocks = {
      user_id: this.stock.user_id,
      transaction_date: this.stock.transaction_date,
      transaction_type: this.stock.transaction_type,
      symbol: this.stock.symbol,
      quantity: this.stock.quantity,
      price: this.stock.price
    };

    console.log("<addStock>: request is -- ", stocks);
   
    this.stockService.create(stocks)
      .subscribe(
        response => {
          console.log("<addStock>: response is -- ", response);
          window.alert("Stock has been added successfully!");
        },
        error => {
          console.log(error);
        });

    this.stock = {
      _id: "",
      user_id: this.value,
      transaction_date: "",
      transaction_type: "",
      symbol: "",
      quantity: 0,
      price: 0
    };
  }

  deleteAllStock() {
    console.log("<deleteAllStock>: request is -- ");

    this.stockService.deleteAll()
      .subscribe(
        response => {
          console.log("<deleteAllStock>: response is -- ", response);
          window.alert("All Stocks have been deleted successfully!");
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.router.navigate(['/login']);
}

}

