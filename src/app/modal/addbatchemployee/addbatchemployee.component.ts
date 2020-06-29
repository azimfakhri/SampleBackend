import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-addbatchemployee',
  templateUrl: './addbatchemployee.component.html',
  styleUrls: ['./addbatchemployee.component.scss'],
})
export class AddbatchemployeeComponent implements OnInit {
  fileData:File;
  employeeList:any = [];
  departmentList:any = [];
  selectedDepartment:any;
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    private loading : LoadingController,
  ) { }

  ngOnInit() {
    this.getDepartment();
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

  fileProgress(fileInput: any){
    this.fileData = <File>fileInput.target.files[0];
    this.readFile();
  }

  readFile(){
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet, {raw:false});
        return initial;
      }, {});
      this.employeeList = jsonData;
    }
    
    reader.readAsBinaryString(this.fileData);
  }

  async proceed(){
    if(this.selectedDepartment){
      if(this.employeeList.length>0){
        let loader = await this.loading.create({
          message:'Please wait.'
        });
        
        loader.present();
  
        for (let index = 0; index < this.employeeList.length; index++) {
          this.employeeList[index].sex =parseInt(this.employeeList[index].sex);
        }
        
        const res = await this.clientservice.addEmployeesByBatch(this.selectedDepartment,this.employeeList);
    
        if(res['code'] == 0){
         this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
         this.modalCtrl.dismiss(true);
        }else{
          this.notification.errorNotification(res['code'],res['msg']);
        }
        
        loader.dismiss();
      }else{
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.UploadBatchWarning);
      }
    }else{
      this.notification.alertNotification(config.message.alert.Warning,config.message.alert.MandatoryField);
    }
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
