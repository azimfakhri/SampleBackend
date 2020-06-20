import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'

@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.scss'],
})
export class AdddepartmentComponent implements OnInit {
  name:string = '';
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
  ) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss(false);
  }

  async proceed(){
    if(this.name != ''){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();
      let data= {
        name: this.name
      }

      const res = await this.clientservice.addDepartment(data);

      if(res['code'] == "0"){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsg);
       this.modalCtrl.dismiss();
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      
      loader.dismiss();
    }else{
      this.notification.alertNotification(config.message.alert.Warning,config.message.alert.MandatoryField);
    }

  }

}
