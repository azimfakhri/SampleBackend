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

  disabledRedirectFor: string[] = ['employee'];

  authState = new BehaviorSubject(false);
  URL_Auth : string = environment.API_Auth;
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
          //this.navCtrl.navigateRoot('/login');
        }
      }else{
        if(this.isAuthenticated()){
          //this.navCtrl.navigateRoot('/getquote');
        }
      }
      
    });
  }

  async changepassword(data){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const res = await this.http.post(this.URL_Auth + 'user/completeReset',JSON.stringify(data), { headers, responseType: 'json'}).toPromise();

    return res;
    
  }

  resetpassword(encrypteddata: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.URL_Auth + 'user/resetpassword/',{data: encodeURIComponent(encrypteddata.toString())}, { headers, responseType: 'json'})
    .subscribe(res =>{
      //console.log(res);
    })
  }

  async login(encrypteddata: any) {
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


    // const res = await this.http.post(this.URL_Auth + 'authenticate',{data: encodeURIComponent(encrypteddata.toString())}, { headers, responseType: 'json'}).toPromise();

    // if(res['success']){
    //   const res2 = await this.custService.getBrokerProfile(JSON.parse(this.jwtHelper.decodeToken(res['token']).data).AccLoginID)
    //   if(res2['success']){
    //     sessionStorage.setItem('user_token', res['token']);
    //     sessionStorage.setItem('user_branch', res2['profile'].branchcode);
    //     sessionStorage.setItem('user_code', res2['profile'].code);
    //     this.authState.next(true);
    //     this.navCtrl.navigateRoot('/getquote');
    //     return true;
    //   }
      
      
        
    // }else{
    //   this.authState.next(false);
    //   return false;
    // }
  }

  logout() {
    sessionStorage.removeItem('user_token');   
    this.authState.next(false);
    this.navCtrl.navigateRoot('/login');
  }
 
  isAuthenticated() {
    const token = sessionStorage.getItem('user_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  getUserLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

}

