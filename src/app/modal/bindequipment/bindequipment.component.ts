import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'

@Component({
  selector: 'app-bindequipment',
  templateUrl: './bindequipment.component.html',
  styleUrls: ['./bindequipment.component.scss'],
})
export class BindequipmentComponent implements OnInit {
  equipment:any;
  name:any;
  departmentList:any = [];
  selectedDepartment:any = [];
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    public loading : LoadingController,
  ) { }

  ngOnInit() {
    this.equipment = this.navParams.get('equipment');
    this.getDepartment();
    this.name = this.equipment.name;
  }

  close(){
    this.modalCtrl.dismiss(false);
  }

  async getDepartment(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getDepartmentList();
    if(res['code'] == 0){
      this.departmentList =  res['data'];
      if(this.equipment.departments.length>0){
        for (let index = 0; index < this.equipment.departments.length; index++) {
          const element = this.equipment.departments[index];
          this.selectedDepartment.push(element.departmentId);
        }
      }
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  async proceed(){
    if(this.name && this.name.length > 0){
      if(this.selectedDepartment.length > 0){
        let loader = await this.loading.create({
          message:'Please wait.'
        });
        
        loader.present();
        let data= {
          name: this.name,
          departmentIds: this.selectedDepartment
        }
  
        const res = await this.clientservice.updateEquipment(this.equipment.equipmentId,data);
  
        if(res['code'] == 0){
         this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsg);
         this.modalCtrl.dismiss(true);
        }else{
          this.notification.errorNotification(res['code'],res['msg']);
        }
        
        loader.dismiss();
      }else{
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.SelectionWarning);
      }
    }else{
      this.notification.alertNotification(config.message.alert.Warning,config.message.alert.MandatoryField);
    }
  }
}
