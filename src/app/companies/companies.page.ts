import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddcompanyComponent } from '../modal/addcompany/addcompany.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  companies:any = []
  constructor(
    private modalCtrl:ModalController
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
