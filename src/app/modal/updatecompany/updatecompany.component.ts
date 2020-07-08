import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-updatecompany',
  templateUrl: './updatecompany.component.html',
  styleUrls: ['./updatecompany.component.scss'],
})
export class UpdatecompanyComponent implements OnInit {
  company:any;
  companyForm:any;
  fileData: File = null;
  previewUrl:any = null;
  constructor(
    private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private adminservice:AdminService,
    private notification:NotificationService,
    public loading : LoadingController,
    private imgservice:ImageService
  ) { }

  ngOnInit() {
    this.SetForm();

    this.company = this.navParams.get('company');

    this.setValue();
  }
  
  SetForm(){
    this.companyForm = this.builder.group({
      'companyName':[
        '',[Validators.required]
      ],
      'logo':[
        ''
      ]
    })
  }

  async setValue(){
    if(this.company){
      this.companyForm.patchValue({companyName:this.company.name})

      if(sessionStorage.getItem('usertype') == '2'){
        const url = await this.imgservice.getImageFromLink(this.company.logo);
        this.previewUrl = url.url;
      }else{
        this.previewUrl = this.company.logo;
      }
      
    }
  }

  close(){
    this.modalCtrl.dismiss(false);
  }

  fileProgress(fileInput: any){
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  async proceed(){
    if(this.companyForm.valid){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();
      var form = this.companyForm.value;
      const formData = new FormData();
      formData.append('companyName', form.companyName);
      formData.append('logo', this.fileData);
      const res = await this.adminservice.UpdateCompany(this.company.companyId,formData);

      if(res['code'] == 0){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
       this.modalCtrl.dismiss(true);
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      loader.dismiss();
    }
    
  }

}
