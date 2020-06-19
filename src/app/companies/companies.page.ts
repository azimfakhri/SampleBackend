import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AddcompanyComponent } from '../modal/addcompany/addcompany.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';
import { NavigationExtras } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  companieslist:any = []
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private adminservice: AdminService,
    private notification:NotificationService,
    public loading: LoadingController,
  ) { }

  ngOnInit() {
    this.getCompany();
    
  }

  async getCompany(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.adminservice.GetCompanyList();
    if(res['code'] == "0"){
      this.companieslist =  res['data'];
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  ListEquipment(com){
    let navigationExtras: NavigationExtras = {
      replaceUrl:true,
      state: {
        company:com
      }
    }
    this.navCtrl.navigateForward('/equipment',navigationExtras);
  }

  ListUser(com){
    let navigationExtras: NavigationExtras = {
      replaceUrl:true,
      state: {
        company:com
      }
    }
    this.navCtrl.navigateForward('/users',navigationExtras);
  }

  async AddCompany(){
    const modal = await this.modalCtrl.create({
      component: AddcompanyComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      this.getCompany();
    });
    return await modal.present();
  }

  

}
