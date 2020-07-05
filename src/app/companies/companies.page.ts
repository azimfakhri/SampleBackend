import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AddcompanyComponent } from '../modal/addcompany/addcompany.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';
import { NavigationExtras } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NotificationService } from '../services/notification.service';
import { ImageService } from '../services/image.service';
import * as config from '../config';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],  
})
export class CompaniesPage implements OnInit {
  companieslist:any = [];
  formattedlist:any = [];
  testblob:any;
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private adminservice: AdminService,
    private notification:NotificationService,
    public loading: LoadingController,
    private imgservice: ImageService
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
    if(res['code'] == 0){
      this.companieslist =  res['data'];
      this.formattedlist = [];
      for (let index = 0; index < this.companieslist.length; index++) {
        const element = this.companieslist[index];
        
        if(element.logo){
          const url = await this.imgservice.getImageFromLink(element.logo);
          this.formattedlist.push({
            companyId:element.companyId,
            name:element.name,
            logo: url.url
          })
        }else{
          this.formattedlist.push({
            companyId:element.companyId,
            name:element.name,
            logo: null
          })
        }
      }
      loader.dismiss();
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
      loader.dismiss();
    }
    
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
      if(res['data']){
        this.getCompany();
      }
      
     
    });
    return await modal.present();
  }

  async DeleteCompany(com){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelTitle,config.message.alert.DelMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.adminservice.DeleteCompany(com.companyId);
        if(res['code'] == 0){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.getCompany();
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }

  

}
