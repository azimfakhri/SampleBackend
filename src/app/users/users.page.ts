import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import * as config from "../config"
import { AdduserComponent } from '../modal/adduser/adduser.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userlist:any =[];
  company:any;
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private route : ActivatedRoute,
    private router : Router,
    private adminservice: AdminService,
    private notification:NotificationService,
    public loading: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.company = this.router.getCurrentNavigation().extras.state.company;

        this.GetUsers();
      }else{
        let navigationExtras: NavigationExtras = {
          replaceUrl:true,
        }
        this.navCtrl.navigateBack('/companies',navigationExtras);
      }
    });
   
  }

  async GetUsers(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.adminservice.GetUserList(this.company.companyId);
    if(res['code'] == "0"){
      this.userlist =  res['data'];
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();

  }

  async AddUser(){
    const modal = await this.modalCtrl.create({
      component: AdduserComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps: {
        company:this.company
     }
    });
    modal.onDidDismiss()
    .then((res) => {
      this.GetUsers();
    });
    return await modal.present();
  }

  async ResetPassword(user){
    const modal = await this.modalCtrl.create({
      component: ResetpasswordComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps:{
       user:user
     }
    });
    return await modal.present();
  }

  async DeleteUser(user){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelUserTitle,config.message.alert.DelUserMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.adminservice.DeleteUser(user.userId);
        if(res['code'] == "0"){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.GetUsers();
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }

  navigateBack(){
    this.navCtrl.navigateBack('/companies');
  }
}
