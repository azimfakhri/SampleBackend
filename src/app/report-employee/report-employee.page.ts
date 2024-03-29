import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ClientService } from '../services/client.service';
import * as config from '../config'
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatAccordion } from '@angular/material';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-report-employee',
  templateUrl: './report-employee.page.html',
  styleUrls: ['./report-employee.page.scss'],
})
export class ReportEmployeePage implements OnInit {
  p: number = 1;
  searchForm:any;
  departmentList:any = [];
  searchResults:any =[];
  formattedList:any =[];
  equipmentList:any = [];
  isOpen:boolean = false;
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private clientservice: ClientService,
    private notification:NotificationService,
    private loading: LoadingController,
    private builder: FormBuilder,
    private imageservice:ImageService
  ) { }

  ngOnInit() {
    this.SetForm();
    this.getDepartment();
  }

  SetForm(){
    this.searchForm = this.builder.group({
      'name':[
        ''
      ],
      'empNo':[
        ''
      ],
      'nric':[
        ''
      ],
      'date':[
        ''
      ],
      'order':[
        'ASC'
      ],
      'selectedEquipment':[
        ''
      ],
      'selectedDepartment':[
        ''
      ]
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
      this.departmentList.unshift({
        departmentId:"",
        departmentName:"ALL"
      });
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  async search(){
    if(this.searchForm.valid){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();
  
      let form = this.searchForm.value;
  
      let data = {
        departmentId:form.selectedDepartment,
        name: form.name ? form.name:'',
        empNo:form.empNo? form.empNo:'',
        nric:form.nric? form.nric:'',
        date:form.date? moment(form.date).format('YYYY-MM-DD'):'',
        order: form.order? form.order: 'ASC',
        page:this.p
      }
        
      const res = await this.clientservice.getEmployeesAccesses(data);
  
      if(res['code'] == 0){
        this.searchResults = res['data'];
        this.formattedList = [];
        if(this.searchResults.length>0){
          for (let index = 0; index < this.searchResults.length; index++) {
            const element = this.searchResults[index];
            
            if(element.img){
              const url = await this.imageservice.getImageFromLink(element.img);
              this.formattedList.push({
                name: element.name,
                firstEntry: element.firstEntry,
                lastEntry: element.lastEntry,
                employeeNo: element.empNo,
                nric: element.nric,
                img: url.url,
                department: element.department
              });
            }else{
              this.formattedList.push({
                name: element.name,
                firstEntry: element.firstEntry,
                lastEntry: element.lastEntry,
                employeeNo: element.empNo,
                nric: element.nric,
                img: null,
                department: element.department
              });
            }
            
            loader.dismiss();
          }
        }else{
          loader.dismiss();
        }

        this.isOpen = false;
      }else{
        this.notification.errorNotification(res['code'],res['msg']);
        loader.dismiss();
      }
      
    }else{
      this.notification.alertNotification(config.message.alert.Warning,config.message.alert.MandatoryField)
    }
    
  }

  changePage(event){
    this.search();
  }

  export(){
    var ws = XLSX.utils.json_to_sheet(this.searchResults);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AccessLog");

    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'AttendanceList'+moment().format('YYYYMMDDHHmm') +'.xlsx');
  }

}
