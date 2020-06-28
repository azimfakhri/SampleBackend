import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config'

@Component({
  selector: 'app-bindemployee',
  templateUrl: './bindemployee.component.html',
  styleUrls: ['./bindemployee.component.scss'],
})
export class BindemployeeComponent implements OnInit {
  department:any;
  employeeList:any = [];
  filteredList:any = [];
  selectedEmployee:any = [];
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    public loading : LoadingController,
  ) { }

  ngOnInit() {
    this.department = this.navParams.get('department');

    this.getAllEmployee();
  }

  async getAllEmployee(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    const res = await this.clientservice.getAllEmployees();
      if(res['code'] == 0){
        this.employeeList =  res['data'];
        this.filteredList = this.employeeList;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
      }
    
    loader.dismiss();
  }

  selectionChange(event){
    this.selectedEmployee.push(event.option.value); 
  }

  async proceed(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();
    let data= {
      departmentId: this.department.departmentId,
      employeesId: this.selectedEmployee
    }

    const res = await this.clientservice.bindEmployeesToDepartment(data);

    if(res['code'] == 0){
     this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsgUpdate);
     this.modalCtrl.dismiss();
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    
    loader.dismiss();
  }
  
  close(){
    this.modalCtrl.dismiss(false);
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;

    var temp = this.employeeList;

    this.filteredList = temp.filter(function(emp){
      return (emp.name.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      emp.empNo.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    });
  }
}
