import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock/stock';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

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
  
  ngOnInit() {
    this.listAllStock(this.value);
  }

  listAllStock(userId) {
    this.stockService.getAll(userId)
      .subscribe(
        response => {
          for (const data of (response as any)) {
            this.model.push({
              _id: data._id,
              user_id: data.user_id,
              transaction_date: data.transaction_date,
              transaction_type: data.transaction_type,
              symbol: data.symbol,
              quantity: data.quantity,
              price: data.price
            });
          }
          console.log("<listAllStock>: response is -- ", response);
        },
        error => {
          console.log(error);
        });
  }

  deleteStock(id) {
    this.stockService.delete(id)
      .subscribe(
        response => {
          console.log("<deleteStock>: response is -- ", response);
          window.alert("Stock has been deleted successfully!");
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.router.navigate(['/login']);
}

}


