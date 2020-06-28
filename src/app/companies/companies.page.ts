import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AddcompanyComponent } from '../modal/addcompany/addcompany.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';
import { NavigationExtras } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NotificationService } from '../services/notification.service';
import { ImageService } from '../services/image.service';


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
      this.companieslist.forEach(async element => {
        const url = await this.imgservice.getImageFromLink(element.logo);
        this.formattedlist.push({
          companyId:element.companyId,
          name:element.name,
          logo: url.url
        })
        console.log(this.formattedlist);
      });
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
      this.getCompany();
     
    });
    return await modal.present();
  }

  

  

}
