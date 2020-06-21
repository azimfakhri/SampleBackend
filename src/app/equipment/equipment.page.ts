import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AddequipmentComponent } from '../modal/addequipment/addequipment.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import * as config from "../config"
import { AdminService } from '../services/admin.service';
import { ClientService } from '../services/client.service';
import { BindequipmentComponent } from '../modal/bindequipment/bindequipment.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  equipmentList:any = [];
  filteredList:any = [];
  company:any;
  usertype:any;
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private route : ActivatedRoute,
    private router : Router,
    private notification: NotificationService,
    public loading : LoadingController,
    private adminservice: AdminService,
    private clientservice:ClientService
  ) { }

  ngOnInit() {
    this.usertype = sessionStorage.getItem('usertype');

    if(this.usertype == 1){
      this.route.queryParams.subscribe(params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.company = this.router.getCurrentNavigation().extras.state.company;
          
          this.GetEquipment();
        }else{
          let navigationExtras: NavigationExtras = {
            replaceUrl:true,
          }
          this.navCtrl.navigateBack('/companies',navigationExtras);
        }
      });
    }else{
      this.GetEquipment();
    }
    
  
  }

  async GetEquipment(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();
    if(this.usertype == 1){
      const res = await this.adminservice.GetEquipmentList(this.company.companyId);
      if(res['code'] == 0){
        this.equipmentList =  res['data'];
        this.filteredList = this.equipmentList;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
    }else{
      const res = await this.clientservice.getEquipments();
      if(res['code'] == 0){
        this.equipmentList =  res['data'];
        this.filteredList = this.equipmentList;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
    }
    
    loader.dismiss();
  }

  async DeleteEquipment(eq){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelTitle,config.message.alert.DelMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.adminservice.DeleteEquipment(eq.equipmentId);
        if(res['code'] == 0){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.GetEquipment();
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }

  async AddEquipment(){
    const modal = await this.modalCtrl.create({
      component: AddequipmentComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps: {
        company:this.company
     }
    });
    modal.onDidDismiss()
    .then((res) => {
      this.GetEquipment();
    });
    return await modal.present();
  }

  async ViewDepartment(eq){
    const modal = await this.modalCtrl.create({
      component: BindequipmentComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps: {
        equipment:eq
     }
    });
    modal.onDidDismiss()
    .then((res) => {
      this.GetEquipment();
    });
    return await modal.present();
  }

  navigateBack(){
    this.navCtrl.navigateBack('/companies');
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;

    var temp = this.equipmentList;

    this.filteredList = temp.filter(function(eq){
      return eq.sn.toLowerCase().includes(filterValue.trim().toLowerCase());
    });
  }

}
