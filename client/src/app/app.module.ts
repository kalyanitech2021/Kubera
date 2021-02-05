import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { DividendComponent } from './dividend/dividend.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockService } from './stock.service';
import { DividendService } from './dividend.service';
import { PortfolioService } from './portfolio.service';
import { DividendListComponent } from './dividend-list/dividend-list.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { DividendEditComponent } from './dividend-edit/dividend-edit.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    DividendComponent,
    PortfolioComponent,
    StockListComponent,
    DividendListComponent,
    StockEditComponent,
    DividendEditComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'portfolio', component: PortfolioComponent},
      {path: 'portfolio/:userId', component: PortfolioComponent},
      {path: 'stock', component: StockComponent},
      {path: 'stock-list/:userId', component: StockListComponent},
      {path: 'stock-edit/:id', component: StockEditComponent},
      {path: 'dividend', component: DividendComponent},
      {path: 'dividend-list/:userId', component: DividendListComponent},
      {path: 'dividend-edit/:id', component: DividendEditComponent}
    ]),
  ],
  providers: [
    StockService,
    DividendService,
    PortfolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

