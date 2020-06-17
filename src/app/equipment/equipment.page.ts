import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddequipmentComponent } from '../modal/addequipment/addequipment.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import * as config from "../config"

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  equipmentList:any = [];
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
    this.GetEquipment();
  }

  GetEquipment(){
    this.equipmentList = [
      {sn:'tesadko213',equipmentId:'asdandjaj2'}
    ]
  }

  async DeleteEquipment(eq){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelEquipmentTitle,config.message.alert.DelEquipmentMsg);
    res.present();

    res.onDidDismiss()
    .then((val) => {
      if(val.role == "delete"){
        //code for deletion
      }
    });
  }

  async AddEquipment(){
    const modal = await this.modalCtrl.create({
      component: AddequipmentComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      //console.log(res);
      if(res.data){
       
      } 
    });
    return await modal.present();
  }

  navigateBack(){
    this.navCtrl.navigateBack('/companies');
  }

}
