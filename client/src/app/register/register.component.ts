import { Component, OnInit } from '@angular/core';
import { Register } from '../register/register';
import { RegisterService } from '../register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  show:boolean = true;

  currentUser: any;

  register: Register = {
    _id: "",
    user_id: "",
    password: "",
    firstname: "",
    lastname: ""
  };

  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {

    const users = {
      user_id: this.register.user_id,
      password: this.register.password,
      firstname: this.register.firstname,
      lastname: this.register.lastname
    };

    console.log("<addUser>: request is -- ", users);

    this.registerService.create(users)
      .subscribe(
        response => {
          this.currentUser = response;
          console.log("<addUser>: response is -- ", response);
          this.show = !this.show;
          window.alert("User registered successfully!");
          this.router.navigate(['/login']);
        });
        error => {
          console.log(error);
        };

  this.register = {
    _id: "",
    user_id: "",
    password: "",
    firstname: "",
    lastname: ""
  };

  }

  cancelRegistration() {
    this.show = !this.show;    
    console.log("<cancelRegistration>: coming in");
    this.router.navigate(['/login']);
  }

}
