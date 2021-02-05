import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock/stock';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

  types = ['Buy', 'Sell'];

  currentStock: any;

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
    this.getStock(this.route.snapshot.paramMap.get('id'));
  }

  getStock(id) {
    this.stockService.get(id)
      .subscribe(
          response=> {
          this.currentStock = response;
          console.log("<getStock>: response is -- ", response);
        });
        error => {
          console.log(error);
        };
    }

  saveStock() {
    this.stockService.update(this.currentStock._id, this.currentStock)
    .subscribe(
      response => {
        console.log("<saveStock>: response is -- ", response);
        window.alert("Stock has been updated successfully!");
        this.router.navigate(['/stock-list/' + this.value]);
      },
      error => {
        console.log(error);
      });

      this.currentStock.transaction_date = "";
      this.currentStock.transaction_type = "";
      this.currentStock.symbol = "";
      this.currentStock.quantity = 0;
      this.currentStock.price = 0;
}

  cancelStock() {
    console.log("<cancelStock>: coming in");
    this.router.navigate(['/stock-list/' + this.value]);
  }

  logout() {
    this.router.navigate(['/login']);
}

}
