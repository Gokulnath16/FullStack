import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  
  public errorMessage = {
    email: [
      { type: 'required', message: 'email is required' },
      { type: 'pattern', message: 'Enter vaild email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ]
  }



  loginForm = this.formBuilder.group({
    email: [
        '', 
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ] ],

    password: ['', [Validators.required]]
  });

  loginData: any = '';
  responseData: any;

  constructor(private loginService: LoginService ,private http: HttpClient, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    
  }

  public LoginSubmit(){

    this.loginData = this.loginForm.value;
    
    this.loginService.loginSubmit(this.loginData);
    
  }

}
