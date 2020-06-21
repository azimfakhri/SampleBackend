import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as config from '../../config'

@Component({
  selector: 'app-viewupdateprofile',
  templateUrl: './viewupdateprofile.component.html',
  styleUrls: ['./viewupdateprofile.component.scss'],
})
export class ViewupdateprofileComponent implements OnInit {
  fullName:any;
  constructor(
    private modalCtrl:ModalController,
    private notification:NotificationService,
    public loading : LoadingController,
    public authservice:AuthenticationService
  ) { }

  ngOnInit() {
    this.GetProfile();
  }

  async GetProfile(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.authservice.GetProfile();
    if(res['code'] == 0){
      this.fullName =  res['data'][0].fullName;
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();

  }

  close(){
    this.modalCtrl.dismiss(false);
  }

  async proceed(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    let data = {
      fullName:this.fullName
    }
      
    const res = await this.authservice.UpdateProfile(data);

    if(res['code'] == 0){
      sessionStorage.setItem('userFullName',this.fullName);
      this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
      this.modalCtrl.dismiss();
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
    
  }
}
