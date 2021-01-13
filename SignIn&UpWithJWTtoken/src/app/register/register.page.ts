import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  get name(){
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  public errorMessage = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Must be atleast 6 charater' }
    ],
    email: [
      { type: 'required', message: 'email is required' },
      { type: 'pattern', message: 'Enter vaild email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Must be atleast 6 charater' }
    ]
  }

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6)]], 
    email: [
            '', 
            [Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    ],

    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerData: any = '';




  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  public submit() {

    this.registerData = this.registrationForm.value;

    this.http.post
              ("/api/user/register", this.registerData)
              .subscribe(
                  (val:any) => {
                      console.log('Post success', val);
                      if(val.user){
                        this.route.navigate(['/login']);
                      }
                  },
                  
                  response => {
                     console.log('Post err', JSON.stringify(response)); 
                  },
                  () => {
                    console.log('post observable completed');
                  });
  }

}
