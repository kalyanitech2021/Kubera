import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  show:boolean = true;
  
  user_id: string = "";
  password: string = "";

  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly loginService: LoginService) {}

    public input: string = "";

    public onInput(a_oEvent): void {
    this.input = a_oEvent.currentTarget.value;
    this.loginService.input = a_oEvent.currentTarget.value;
  }

  ngOnInit() {
  }

  loginUser() {
    this.show = !this.show;
    this.router.navigate(['/portfolio/' + this.input]);
  }

  registerUser() {
    this.show = !this.show;    
    this.router.navigate(['/register']);
  }
}