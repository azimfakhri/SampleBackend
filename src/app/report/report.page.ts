import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ClientService } from '../services/client.service';
import * as config from '../config'
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  p: number = 1;
  searchForm:any;
  searchResults:any =[];
  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private clientservice: ClientService,
    private notification:NotificationService,
    private loading: LoadingController,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.SetForm();
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
      'from':[
        ''
      ],
      'to':[
        ''
      ],
      'order':[
        'ASC'
      ]
    })
  }

  async search(){
    let loader = await this.loading.create({
      message:'Please wait.'
    });
    
    loader.present();

    let form = this.searchForm.value;

    let data = {
      name: form.name ? form.name:'',
      empNo:form.empNo? form.empNo:'',
      nric:form.nric? form.nric:'',
      from:form.from? moment(form.from).startOf('day').format('YYYY-MM-DD HH:mm'):'',
      to:form.to? moment(form.to).endOf('day').format('YYYY-MM-DD HH:mm'):'',
      order: form.order? form.order: 'ASC',
      page:this.p
    }
      
    const res = await this.clientservice.getAccessByEquipment('3ada9d841bf84d26b76dfbe0ff66b216',data);

    if(res['code'] == 0){
      this.searchResults = res['data'];
    }else{
      this.notification.errorNotification(res['code'],res['msg']);
    }
    loader.dismiss();
  }

  changePage(event){
    console.log(event);
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

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'AccessLog'+moment().format('YYYYMMDDHHmm') +'.xlsx');
  }

}
