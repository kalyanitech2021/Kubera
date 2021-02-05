import { Component, OnInit } from '@angular/core';
import { Dividend } from '../dividend/dividend';
import { DividendService } from '../dividend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.css']
})
export class DividendComponent implements OnInit {

  constructor(
    private dividendService: DividendService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

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

  ngOnInit(): void {
  }

  addDividend() {
    
    const dividends = {
      user_id: this.dividend.user_id,
      transaction_date: this.dividend.transaction_date,
      transaction_type: this.dividend.transaction_type,
      symbol: this.dividend.symbol,
      ex_div_date: this.dividend.ex_div_date,
      record_date: this.dividend.record_date,
      payment_date: this.dividend.payment_date,
      div_per_share: this.dividend.div_per_share
    };

    console.log("<addDividend>: request is -- ", dividends);

    this.dividendService.create(dividends)
      .subscribe(
        response => {
          console.log("<addDividend>: response is -- ", response);
          window.alert("Dividend has been added successfully!");
        },
        error => {
          console.log(error);
        });

    this.dividend = {
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
  }

  deleteAllDividend() {
    console.log("<deleteAllDividend> request is -- ");

    this.dividendService.deleteAll()
      .subscribe(
        response => {
          console.log("<deleteAllDividend>: response is -- ", response);
          window.alert("All Dividends have been deleted successfully!");
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.router.navigate(['/login']);
}

}
