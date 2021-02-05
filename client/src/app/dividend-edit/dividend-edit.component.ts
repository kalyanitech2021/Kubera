import { Component, OnInit } from '@angular/core';
import { Dividend } from '../dividend/dividend';
import { DividendService } from '../dividend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dividend-edit',
  templateUrl: './dividend-edit.component.html',
  styleUrls: ['./dividend-edit.component.css']
})
export class DividendEditComponent implements OnInit {

  constructor(
    private dividendService: DividendService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) { }

    public get value(): string {
      return this.loginService.input;
    }

    currentDividend: any;

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
    this.getDividend(this.route.snapshot.paramMap.get('id'));
  }

  getDividend(id) {

    console.log("<getDividend>: coming in");

    this.dividendService.get(id)
      .subscribe(
          response=> {
          this.currentDividend = response;
          console.log("<getDividend>: response is -- ", response);
        });
        error => {
          console.log(error);
        };
    }

  saveDividend() {
    this.dividendService.update(this.currentDividend._id, this.currentDividend)
    .subscribe(
      response => {
        console.log("<saveDividend>: response is -- ", response);
        window.alert("Dividend has been updated successfully!");
        this.router.navigate(['/dividend-list/' + this.value]);
      },
      error => {
        console.log(error);
      });

      this.currentDividend.transaction_date = "";
      this.currentDividend.transaction_type = "";
      this.currentDividend.symbol = "";
      this.currentDividend.ex_div_date = "";
      this.currentDividend.record_date = "";
      this.currentDividend.payment_date = "";
      this.currentDividend.div_per_share = 0;
}

  cancelDividend() {
    this.router.navigate(['/dividend-list/' + this.value]);
  }

  logout() {
    this.router.navigate(['/login']);
}

}
