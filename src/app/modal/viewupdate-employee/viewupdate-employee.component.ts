import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'
import { FormBuilder, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-viewupdate-employee',
  templateUrl: './viewupdate-employee.component.html',
  styleUrls: ['./viewupdate-employee.component.scss'],
})
export class ViewupdateEmployeeComponent implements OnInit {
  employeeForm:any;
  fileData: File = null;
  previewUrl:any = null;
  genderList:any = [];
  departmentList:any = [];

  employeeid:any;
  employee:any;
  editable:boolean = false;
  imageURL:string = null;
  constructor( private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
    private imgservice: ImageService
  ) { }

  ngOnInit() {
    this.employeeid = this.navParams.get('employeeid');
    this.editable = this.navParams.get('editable');

    this.SetForm();
    this.getEmployeeDetails();
  }

  SetForm(){
    this.genderList = [
      {description:'Male',value:1},
      {description:'Female',value:0}
    ]
    this.employeeForm = this.builder.group({
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
        '',[Validators.required]
      ],
      'empNo':[
        ''
      ],
      'address':[
        ''
      ]
    })
  }

  async getEmployeeDetails(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getEmployee(this.employeeid);
    if(res['code'] == 0){
      this.employee =  res['data'][0];
      
      if(this.employee.img){
        const url = await this.imgservice.getImageFromLink(this.employee.img);
        this.imageURL = url.url;
      }

     
      this.employeeForm.patchValue(this.employee);
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
      
      const res = await this.clientservice.updateEmployee(this.employeeid,formData);

      if(res['code'] == 0){
       this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
       this.modalCtrl.dismiss(true);
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      loader.dismiss();
    }
    
  }
  
  async DeleteImage(){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelTitle,config.message.alert.DelImgMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.clientservice.deleteEmployeeImage(this.employeeid);
        if(res['code'] == 0){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.imageURL = null;
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }
}