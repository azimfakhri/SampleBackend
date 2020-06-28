import { Component, OnInit } from '@angular/core';
import { AuthenticationService }from 'src/app/services/authentication.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  password_type: string = 'password';
  iserror: boolean = false;
  constructor(
    private navCtrl: NavController,
    public authservice: AuthenticationService
    ) { 
      this.username = '';
      this.password = '';
      if(this.authservice.isAuthenticated()){
        this.navCtrl.navigateRoot('/home');
      }
    }

  ngOnInit() {
  }

  async login(){
    let logindata = {
      username: this.username,
      password: this.password
    }

    const res = await this.authservice.login(logindata);
    if(res == false){
      this.iserror = true;
    }else{
      this.iserror = false;
    }
  }

  resetpassword(){
    this.navCtrl.navigateForward('/auth/reset');
  }

  togglePasswordMode(){
    

   this.password_type = this.password_type === 'text' ? 'password' : 'text';

  }
}
