import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams, LoadingController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  currentpassword:any = "";
  newPassword:any = "";
  confirmpassword:any = "";

  user:any;
  changeOwn:boolean = true;
  constructor(
    public navParams: NavParams,
    private modalCtrl:ModalController,
    private adminservice:AdminService,
    private notification:NotificationService,
    public loading : LoadingController,
    public authservice:AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
    if(this.user){
      this.changeOwn = false;
    }
  }

  async proceed(){
    if(this.changeOwn){
      if(this.currentpassword == "" || this.newPassword == "" || this.confirmpassword == ""){
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.MandatoryField);
      }else{
        if(this.newPassword == this.confirmpassword){
          let pw = {
            currentPassword: this.currentpassword, // required
            newPassword: this.newPassword, // required
            newPasswordConfirm: this.confirmpassword // required
          }

          const res = await this.authservice.resetpassword(pw);
          if(res['code'] == "0"){
            this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgPassword);
            this.modalCtrl.dismiss();
           }else{
             this.notification.errorNotification(res['code'],res['msg']);
           }

        }else{
          this.notification.alertNotification(config.message.alert.Warning,config.message.alert.PasswordNotMatch);
        }
      }
    }else{
      if(this.newPassword == this.confirmpassword){
        let data ={
          newPassword:this.confirmpassword
        }
  
        const res = await this.adminservice.ResetUserPassword(this.user.userId,data);
          if(res['code'] == "0"){
            this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgPassword);
            this.modalCtrl.dismiss();
           }else{
             this.notification.errorNotification(res['code'],res['msg']);
           }
      }else{
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.PasswordNotMatch);
      }
    }
    
    
  }

  close(){
    this.modalCtrl.dismiss(false);
  }


}
