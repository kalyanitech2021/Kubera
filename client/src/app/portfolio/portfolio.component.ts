import { Component, OnInit } from '@angular/core';
import { Portfolio } from './portfolio';
import { PortfolioService } from '../portfolio.service';
import { RegisterService } from '../register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  constructor(
    private portfolioService: PortfolioService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) {}
  
    public get value(): string {
      return this.loginService.input;
    }

  portfolio: Portfolio = {
    user_id: this.value,
    symbol: "",
    purchasedDate: "",
    totalQuantity: 0,
    avgPrice: 0,
    totalBuyCost: 0,
    currentPrice: 0
  };

  model: any = [];
  
  ngOnInit() {
    this.listPortfolio(this.value);
  }

  listPortfolio(userId) {
    this.portfolioService.get(userId)
      .subscribe(
        response => {
          for (const data of (response as any)) {
            this.model.push({
              user_id: data.user_id,
              symbol: data._id,
              purchasedDate: data.purchasedDate,
              totalQuantity: data.totalQuantity,
              avgPrice: data.avgPrice,
              totalBuyCost: data.totalBuyCost,
              currentPrice: data.currentPrice
            });
          }
          console.log("<listPortfolio>: response is -- ", response);
        },
        error => {
          console.log(error);
        }); 
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
  