import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import * as config from "../config"
import { AdduserComponent } from '../modal/adduser/adduser.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';

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
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.company = this.router.getCurrentNavigation().extras.state.company;
        console.log(this.company);
      }else{
        let navigationExtras: NavigationExtras = {
          replaceUrl:true,
        }
        this.navCtrl.navigateBack('/companies',navigationExtras);
      }
    });
    this.GetUsers();
  }

  GetUsers(){
    this.userlist = [
      {userId:'tesadko213',username:'asdandjaj2',fullName:'test'}
    ]
  }

  async AddUser(){
    const modal = await this.modalCtrl.create({
      component: AdduserComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log(res);
    });
    return await modal.present();
  }

  async ResetPassword(com){
    const modal = await this.modalCtrl.create({
      component: ResetpasswordComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps:{
       com:com
     }
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log(res);
    });
    return await modal.present();
  }

  async DeleteUser(user){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelUserTitle,config.message.alert.DelUserMsg);
    res.present();

    res.onDidDismiss()
    .then((val) => {
      if(val.role == "delete"){
        //code for deletion
      }
    });
  }

  navigateBack(){
    this.navCtrl.navigateBack('/companies');
  }
}
