import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ClientService } from '../services/client.service';
import { NotificationService } from '../services/notification.service';
import { AddemployeeComponent } from '../modal/addemployee/addemployee.component';
import * as config from '../config'
import { ViewupdateEmployeeComponent } from '../modal/viewupdate-employee/viewupdate-employee.component';
import { AddbatchemployeeComponent } from '../modal/addbatchemployee/addbatchemployee.component';
import { ImageService } from '../services/image.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { UpdatebatchemployeeComponent } from '../modal/updatebatchemployee/updatebatchemployee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  departmentList: any = [];
  employeeList:any = [];
  filteredList:any = [];
  exportlist:any = [];

  selectedDepartment:any;
  selectedDepartmentName:any;
  
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private clientservice: ClientService,
    private notification:NotificationService,
    private loading: LoadingController,
    private imgservice:ImageService
    ) { }

  ngOnInit() {
    this.getDepartment();
  }

  async getAllEmployee(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();
    let data ={
      departmentId:this.selectedDepartment,
      detail:1
    }
    const res = await this.clientservice.getAllEmployees(data);
      if(res['code'] == 0){
        this.employeeList =  res['data'];
        this.filteredList = [];
        if(this.employeeList.length > 0){
          for (let index = 0; index < this.employeeList.length; index++) {
            const element = this.employeeList[index];
            
            if(element.img){
              const url = await this.imgservice.getImageFromLink(element.img);
              this.filteredList.push({
                departmentId:element.departmentId,
                departmentName:element.departmentName,
                empNo:element.empNo,
                employeeId:element.employeeId,
                img:url.url,
                name:element.name
              });
              loader.dismiss();
            }else{
              this.filteredList.push({
                departmentId:element.departmentId,
                departmentName:element.departmentName,
                empNo:element.empNo,
                employeeId:element.employeeId,
                img:null,
                name:element.name
              });
              loader.dismiss();
            }
          }
        }else{
          loader.dismiss();
        }
        
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
        loader.dismiss();
      }
    // else{
    //   var array = this.departmentList;

    //   var temp = array.find(x => x.departmentId == this.selectedDepartment);
    //   this.selectedDepartmentName = temp.departmentName;

    //   const res = await this.clientservice.getEmployeesByDepartment(this.selectedDepartment);
    //   if(res['code'] == 0){
    //     this.employeeList =  res['data'][0].employees;
    //     this.filteredList = [];
    //     if(this.employeeList.length > 0){
    //       for (let index = 0; index < this.employeeList.length; index++) {
    //         const element = this.employeeList[index];
            
    //         if(element.img){
    //           const url = await this.imgservice.getImageFromLink(element.img);
    //           this.filteredList.push({
    //             empNo:element.empNo,
    //             employeeId:element.employeeId,
    //             img:url.url,
    //             name:element.name
    //           })
    //           loader.dismiss();
    //         }else{
    //           this.filteredList.push({
    //             empNo:element.empNo,
    //             employeeId:element.employeeId,
    //             img:null,
    //             name:element.name
    //           })
    //           loader.dismiss();
    //         }
    //       }
    //     }else{
    //       loader.dismiss();
    //     }
        
    //   }else{
    //     this.notification.errorNotification(res['code'],res['msg']);
    //     loader.dismiss();
    //   }
    // }
  }

  async getDepartment(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getDepartmentList();
    if(res['code'] == 0){
      this.departmentList =  res['data'];
      this.departmentList.unshift({
        departmentId:"",
        departmentName:"ALL"
      });
      this.selectedDepartment = '';
      this.getAllEmployee();
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  async AddEmployee(){
    const modal = await this.modalCtrl.create({
      component: AddemployeeComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res['data']){
        this.getDepartment();
      }
      
     
    });
    return await modal.present();
  }

  async AddEmployeeBatch(){
    const modal = await this.modalCtrl.create({
      component: AddbatchemployeeComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res['data']){
        this.getDepartment();
      }
      
     
    });
    return await modal.present();
  }

  async UpdateEmployeeBatch(){
    const modal = await this.modalCtrl.create({
      component: UpdatebatchemployeeComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res['data']){
        this.getDepartment();
      }
      
     
    });
    return await modal.present();
  }

  async ViewEmployee(emp){
    const modal = await this.modalCtrl.create({
      component: ViewupdateEmployeeComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps:{
        employeeid:emp.employeeId,
        editable:false
      }
    });
    return await modal.present();
  }

  async UpdateEmployee(emp){
    const modal = await this.modalCtrl.create({
      component: ViewupdateEmployeeComponent,
      backdropDismiss:false,
      cssClass:'auto-height',
      componentProps:{
        employeeid:emp.employeeId,
        editable:true
      }
    });
    modal.onDidDismiss()
    .then((res) => {
      this.getDepartment();
    });
    return await modal.present();
  }

  async DeleteEmployee(emp){
    var res = await this.notification.DeleteConfirmation(config.message.alert.DelTitle,config.message.alert.DelMsg);
    res.present();

    res.onDidDismiss()
    .then(async (val) => {
      if(val.role == "delete"){
        const res = await this.clientservice.deleteEmployee(emp.employeeId);
        if(res['code'] == 0){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgDelete);
          this.getDepartment();
        }else{
           this.notification.errorNotification(res['code'],res['msg']);
        }
      }
    });
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;

    var temp = this.employeeList;

    this.filteredList = temp.filter(function(emp){
      return (emp.name.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      emp.empNo.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      emp.departmentName.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    });
  }

  export(){
    this.exportlist = [];
    for (let index = 0; index < this.employeeList.length; index++) {
      const element = this.employeeList[index];

      let ex = {
        employeeId: element.employeeId,
        department: element.departmentName,
        name: element.name,
        phone: element.phone,
        sex: element.sex,
        empNo: element.empNo,
        nric: element.nric,
        address: element.address
      }

      this.exportlist.push(ex);      
    }
    var ws = XLSX.utils.json_to_sheet(this.exportlist);

    /* get worksheet range */
    var range = XLSX.utils.decode_range(ws['!ref']);
    for(var R = range.s.r; R <= range.e.r; ++R) {
      for(var C = range.s.c; C <= range.e.c; ++C) {
        var cell_address = {c:C, r:R};
        /* if an A1-style address is needed, encode the address */
        var ref = XLSX.utils.encode_cell(cell_address);
        //console.log(ws[ref]);
        if(!ws[ref]) continue;
        ws[ref].t = 's';
        ws[ref].z = '@';

        XLSX.utils.format_cell(ws[ref]);
      }
    }

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AccessLog");

    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EmployeeList'+moment().format('YYYYMMDDHHmm') +'.xlsx');
  }

}
