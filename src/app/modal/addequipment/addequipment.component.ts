import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config';

@Component({
  selector: 'app-addequipment',
  templateUrl: './addequipment.component.html',
  styleUrls: ['./addequipment.component.scss'],
})
export class AddequipmentComponent implements OnInit {
  sn:any;
  company:any;
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private adminservice:AdminService,
    private notification:NotificationService,
    public loading : LoadingController,
  ) { }

  ngOnInit() {
    this.company = this.navParams.get('company');
  }

  async proceed(){
    if(this.sn != ''){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();

      let data = {
        companyId:this.company.companyId,
        sn:this.sn
      }

      const res = await this.adminservice.AddNewEquipment(data);

      if(res['code'] == 0){
        this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsg);
        this.modalCtrl.dismiss(true);
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }

      loader.dismiss();
    }
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
