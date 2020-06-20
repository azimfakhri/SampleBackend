import { Component, OnInit } from '@angular/core';
import * as config from '../../config'
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.scss'],
})
export class EditdepartmentComponent implements OnInit {
  name:string = '';
  department:any;
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
  ) { }

  ngOnInit() {
    this.department = this.navParams.get('department');
    this.name = this.department.departmentName;
    console.log(this.department);
  }

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

      const res = await this.clientservice.updateDepartment(this.department.departmentId,data);

      if(res['code'] == "0"){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
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
