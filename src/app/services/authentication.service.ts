import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastController, Platform, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  disabledRedirectFor: string[] = [];

  authState = new BehaviorSubject(false);
  URL_API : string = environment.API;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient,
    public route: ActivatedRoute,
    public jwtHelper: JwtHelperService,
  ) { 
    this.platform.ready().then(() => {
      if (location && !this.disabledRedirectFor.find(path => {
        return location.pathname.includes(path)
      })){
        if(!this.isAuthenticated()){
          this.navCtrl.navigateRoot('/login');
        }
      }else{
        if(this.isAuthenticated()){
          this.navCtrl.navigateRoot('/home');
        }
      }
      
    });
  }

  // async changepassword(data){
  //   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //   const res = await this.http.post(this.URL_Auth + 'user/completeReset',JSON.stringify(data), { headers, responseType: 'json'}).toPromise();

  //   return res;
    
  // }

  async resetpassword(data: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/account/changePassword',JSON.stringify(data), { headers, responseType: 'json'}).toPromise()
    .catch(err => { console.log(err);
   });

    return res;
  }

  async login(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/account/login',JSON.stringify(data), { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    if(res['code'] == "0"){
      
      sessionStorage.setItem('user-token', res['data'][0].token);
      sessionStorage.setItem('userFullName', res['data'][0].userFullName);
      sessionStorage.setItem('usertype', res['data'][0].type);
      sessionStorage.setItem('companyId', res['data'][0].company.id);
      sessionStorage.setItem('companyName', res['data'][0].company.name);
      sessionStorage.setItem('companyLogo', res['data'][0].company.logo);
      this.authState.next(true);
      this.navCtrl.navigateRoot('/home');
      return true;
        
    }else{
      this.authState.next(false);
      return false;
    }
  }



  logout() {
    sessionStorage.clear();   
    this.authState.next(false);
    this.navCtrl.navigateRoot('/login');
  }
 
  isAuthenticated() {
    const token = sessionStorage.getItem('user-token');
    if(token){
      //return !this.jwtHelper.isTokenExpired(token);

      if(this.jwtHelper.isTokenExpired(token)){
        //const res = this.refreshToken();

        return false
      }else{
        return true
      }
    }else{
      return false;
    }
    
    
  }
  
  getUserLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  async refreshToken(){
    const res = await this.http.get(this.URL_API + '/account/refreshToken', { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    if(res['code'] == "0"){
      sessionStorage.setItem('user-token', res['data'][0].newToken);  
      return true;
    }else{
      return false;
    }
  }

}

