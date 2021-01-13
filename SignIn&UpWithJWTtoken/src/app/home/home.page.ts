import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  isLoggedIn: boolean;
  index = 0
  details: any = [];

  constructor(private route: Router, private loginService: LoginService ) {}

  async ngOnInit() {
    //check if user is logged In
    try{    
      if(localStorage.getItem('access_token') && localStorage.getItem('auth') == 'true'){
        //get the username from token using services
        this.isLoggedIn = true;

        await this.loginService.getData().subscribe((response) => {
          this.details = response;
        });    
      }
    }catch(err){
      this.isLoggedIn = false;
    }

  }


  public navigateToLogin(){
    this.route.navigate(['/login']);
  }

  public navigateToRegister(){
    this.route.navigate(['/register']);
  }

  public logout(){
    this.isLoggedIn = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth');
    this.route.navigate(['/home']);
  }



}
