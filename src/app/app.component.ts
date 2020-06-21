import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Platform, NavController, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NotificationService } from './services/notification.service';
import { ResetpasswordComponent } from './modal/resetpassword/resetpassword.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isLoggedin:boolean = false;
  accloginid:string;
  idleState:string = 'Not started.';
  timedOut:boolean = false;
  lastPing?: Date = null;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authservice: AuthenticationService,
    public jwtHelper: JwtHelperService,
    private navctrl: NavController,
    public idle: Idle,
    public keepalive: Keepalive,
    private notification:NotificationService,
    private modalCtrl:ModalController,
    
    public alertctrl: AlertController,
    public loading: LoadingController
  ) {
    this.initializeApp();

    idle.setIdle(900);
    idle.setTimeout(30);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    
    idle.onIdleStart.subscribe(() => { 
      this.modalCtrl.dismiss();
      this.alertctrl.dismiss();
      this.loading.dismiss()
      this.idleState = 'You\'ve gone idle!';
      notification.alertNotification(this.idleState,'You will be auto log out after 30 Seconds if there is inactivity.');
    });

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.logout();
      
    });

    keepalive.interval(10);

    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
      console.log('interval 10')
      if(this.CheckLoggedIn()){
        console.log('interval:true')
      }else{
        console.log('interval:false')
        const res = this.refreshToken();

        console.log(res);
      }
      
    });

    this.authservice.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        this.CheckLoggedInv2();
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })

  }


  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.CheckLoggedIn();
  }

  CheckLoggedIn(){
    this.isLoggedin = this.authservice.isAuthenticated()
    return this.isLoggedin;
  }

  CheckLoggedInv2(){
    this.isLoggedin = this.authservice.isAuthenticatedv2()
    return this.isLoggedin;
  }

  getLoginID(){
    if(this.CheckLoggedIn()){
      return sessionStorage.getItem('userFullName');
    }
  }

  async refreshToken(){
    const res = await this.authservice.refreshToken();
    return res;
  }

  logout(){
    this.authservice.logout();
  }

  async ChangePassword(){
    const modal = await this.modalCtrl.create({
      component: ResetpasswordComponent,
      backdropDismiss:false,
      cssClass:'auto-height'
    });
    return await modal.present();
  }

  Profile(){
    this.navctrl.navigateRoot('/profile',{
      replaceUrl:true
    })
  }

}
