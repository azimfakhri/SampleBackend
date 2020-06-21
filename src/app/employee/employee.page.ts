import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ClientService } from '../services/client.service';
import { NotificationService } from '../services/notification.service';
import { AddemployeeComponent } from '../modal/addemployee/addemployee.component';
import * as config from '../config'
import { ViewupdateEmployeeComponent } from '../modal/viewupdate-employee/viewupdate-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  departmentList: any = [];
  employeeList:any = [];
  filteredList:any = [];

  selectedDepartment:any;
  selectedDepartmentName:any;
  
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private clientservice: ClientService,
    private notification:NotificationService,
    private loading: LoadingController) { }

  ngOnInit() {
    this.getDepartment();
  }

  async getAllEmployee(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    if(this.selectedDepartment == 'ALL'){
      const res = await this.clientservice.getAllEmployees();
      if(res['code'] == 0){
        this.employeeList =  res['data'];
        this.filteredList = this.employeeList;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
    }else{
      var array = this.departmentList;

      var temp = array.find(x => x.departmentId == this.selectedDepartment);
      console.log(temp);
      this.selectedDepartmentName = temp.departmentName;

      const res = await this.clientservice.getEmployeesByDepartment(this.selectedDepartment);
      if(res['code'] == 0){
        this.employeeList =  res['data'][0].employees;
        this.filteredList = this.employeeList;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
    }

    
    loader.dismiss();
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
        departmentId:"ALL",
        departmentName:"ALL"
      });
      this.selectedDepartment = 'ALL';
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
      this.getDepartment();
     
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

}
