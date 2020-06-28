import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { LoadingController } from '@ionic/angular';
import { PublicService } from '../services/public.service';
import * as config from '../config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.page.html',
  styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {
  nric:string;
  name:string;
  result:any;
  needupload:boolean = false;
  fileData: File = null;
  previewUrl:any = null;

  companyid:string;
  constructor(
    private notification:NotificationService,
    private loading: LoadingController,
    private publicservice:PublicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.companyid = params['com'];
  });
  }

  async search(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();
      
    const res = await this.publicservice.getdetails(this.companyid,this.nric);

    if(res['code'] == 0){
      this.result = res['data'][0];
      this.name = this.result.name;
      if(this.result.imgUploaded){
        this.notification.alertNotification(config.message.alert.Info,config.message.alert.UploadTrue);
        this.needupload = false;
      }else{
        this.needupload = true;
      }
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
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
    if(this.fileData){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();
  
      const formData = new FormData();
      formData.append('img', this.fileData);
      
      const res = await this.publicservice.uploadimg(this.result.employeeId,formData);
  
      if(res['code'] == 0){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.UploadSuccess);
       this.needupload = false;
       this.nric = '';
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      loader.dismiss();
    }else{
      this.notification.alertNotification(config.message.alert.Warning,config.message.alert.FileEmpty);
    }
    
  }

}
