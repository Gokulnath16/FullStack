import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: any;
  authentication: any;

  constructor(private http: HttpClient, private route: Router) { }

  loginSubmit(data){ 
    
    this.http.post("/api/user/login", data)
              .subscribe(
                  (response:any) => {
                    if(response.auth == true && response.authToken !== undefined){
                      localStorage.setItem('access_token', response.authToken);
                      localStorage.setItem('auth', 'true');
                      this.route.navigate(['/home']).then(() => {window.location.reload(); });
                    }
                  },
              );  
  }//LoginSubmit

  getData(){
    if(localStorage.getItem('auth') == 'true'){
      let token = localStorage.getItem('access_token');
      return this.http.get('/api/display/user?key='+ token);
    }
  }




}

