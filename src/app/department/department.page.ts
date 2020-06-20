import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ClientService } from '../services/client.service';
import { AdddepartmentComponent } from '../modal/adddepartment/adddepartment.component';
import * as config from '../config'

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  departmentList:any = [];
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private clientservice: ClientService,
    private notification:NotificationService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.getDepartment();
  }

  async getDepartment(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getDepartmentList();
    if(res['code'] == "0"){
      this.departmentList =  res['data'];
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  async AddDepartment(){
    const modal = await this.modalCtrl.create({
      component: AdddepartmentComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      this.getDepartment();
     
    });
    return await modal.present();
  }

  async DeleteDepartment(dep){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelTitle,config.message.alert.DelMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.clientservice.deleteDepartment(dep.departmentId);
        if(res['code'] == "0"){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.getDepartment();
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }

}
