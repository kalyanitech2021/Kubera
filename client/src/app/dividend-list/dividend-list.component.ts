import { Component, OnInit } from '@angular/core';
import { Dividend } from '../dividend/dividend';
import { DividendService } from '../dividend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dividend-list',
  templateUrl: './dividend-list.component.html',
  styleUrls: ['./dividend-list.component.css']
})
export class DividendListComponent implements OnInit {

  constructor(
    private dividendService: DividendService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

    model: any = [];

  dividend: Dividend = {
    _id: "",
    user_id: this.value,
    transaction_date: "",
    transaction_type: "Dividend",
    symbol: "",
    ex_div_date: "",
    record_date: "",
    payment_date: "",
    div_per_share: 0
  };

  ngOnInit() {
    this.listAllDividend(this.value);
  }

  listAllDividend(userId) {
    this.dividendService.getAll(userId)
      .subscribe(
        response => {
          for (const data of (response as any)) {
            this.model.push({
              _id: data._id,
              user_id: data.user_id,
              transaction_date: data.transaction_date,
              transaction_type: data.transaction_type,
              symbol: data.symbol,
              ex_div_date: data.ex_div_date,
              record_date: data.record_date,
              payment_date: data.payment_date,
              div_per_share: data.div_per_share
            });
          }
          console.log("<listAllDividend> response is -- ", response);
        },
        error => {
          console.log(error);
        });
      }

  deleteDividend(id) {
    console.log("<deleteDividend>: request is -- ");
    this.dividendService.delete(id)
      .subscribe(
        response => {
          console.log("<deleteDividend>: response is -- ", response);
          window.alert("Dividend has been deleted successfully!");
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.router.navigate(['/login']);
}

}
