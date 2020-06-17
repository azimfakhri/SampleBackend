import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddcompanyComponent } from '../modal/addcompany/addcompany.component';
import { ResetpasswordComponent } from '../modal/resetpassword/resetpassword.component';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  companies:any = []
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
  ) { }

  ngOnInit() {
    this.GetCompanies();
    
  }

  GetCompanies(){
    
    this.companies = [
      {companyId:'2e649e62f9924cb8825062e679f0a600',name:'Test1',logo:''},
      {companyId:'2e649e62f9924cb8825062e679f0a601',name:'Test2',logo:''}
    ]
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
      //console.log(res);
      if(res.data){
       
      } 
    });
    return await modal.present();
  }

  

}
