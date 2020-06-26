import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor( private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
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
        ''
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
       this.modalCtrl.dismiss();
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
      loader.dismiss();
    }
    
  }
}