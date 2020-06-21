import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss'],
})
export class AddemployeeComponent implements OnInit {
  employeeForm:any;
  fileData: File = null;
  previewUrl:any = null;
  genderList:any = [];
  departmentList:any = [];
  constructor(
    private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
  ) { }

  ngOnInit() {
    this.SetForm();
    this.getDepartment();
  }

  SetForm(){
    this.genderList = [
      {description:'Male',value:1},
      {description:'Female',value:0}
    ]
    this.employeeForm = this.builder.group({
      'departmentId':[
        '',[Validators.required]
      ],
      'name':[
        '',[Validators.required]
      ],
      'phone':[
        '',[Validators.required]
      ],
      'sex':[
        '',[Validators.required]
      ],
      'nric':[
        ''
      ],
      'empNo':[
        ''
      ],
      'address':[
        ''
      ],
      'img':[
        ''
      ],
    })
  }

  async getDepartment(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getDepartmentList();
    if(res['code'] == 0){
      this.departmentList =  res['data'];
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
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
    if(this.employeeForm.valid){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();
      var form = this.employeeForm.value;

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('sex', form.sex);
      formData.append('empNo', form.empNo);
      formData.append('nric', form.nric);
      formData.append('address', form.address);
      if(this.fileData){
        formData.append('img', this.fileData);
      }
      
      const res = await this.clientservice.addEmployeeByDepartment(form.departmentId,formData);

      if(res['code'] == 0){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsg);
       this.modalCtrl.dismiss();
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      loader.dismiss();
    }
    
  }
}
