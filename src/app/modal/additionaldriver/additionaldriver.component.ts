import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
@Component({
  selector: 'app-additionaldriver',
  templateUrl: './additionaldriver.component.html',
  styleUrls: ['./additionaldriver.component.scss'],
})
export class AdditionaldriverComponent implements OnInit {
  title:string;
  isAdd: boolean = true;
  isNric:boolean = true;

  driverForm:any;
  editDriver:any;
  index:any

  CustomerIDType:any;
  relationList: any;
  genderList:any;
  dayList:any;
  monthList:any;
  occupationList:any;

  birthDate:any;
  now: any = moment();
  iclength:number = 14;
  constructor(private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams) { }

  ngOnInit() {
    this.setForm();
    this.getList();
    this.isAdd = this.navParams.get('isAdd');
    this.editDriver = this.navParams.get('driver');
    this.index = this.navParams.get('index');
    if(this.editDriver){
     this.driverForm.patchValue(this.editDriver);
    }
    if(this.isAdd){
      this.title = 'Add additional driver'
    }else{
      this.title = 'Edit additional driver'
    }

  }

  setForm(){
    this.driverForm = this.builder.group({
      'name': [
        '',[Validators.required]
      ],
      'idtype': [
        'N'
      ],
      'idNo': [
        '',[Validators.required]
      ],
      'dob': [
        ''
      ],
      'gender': [
        'M',
      ],
      'relationship': [
        '',[Validators.required]
      ],
      'occupation': [
        '',[Validators.required]
      ],
      'drivingExp': [
        '',[Validators.required]
      ],
      'dobd': [
        '',[Validators.required]
      ],
      'dobm': [
        '',[Validators.required]
      ],
      'doby': [
        '',[Validators.required]
      ],


    })
  }

  getList(){
    this.relationList = JSON.parse(localStorage.getItem('relationships'));
    this.CustomerIDType =JSON.parse(localStorage.getItem('idtype'));
    this.genderList = [
      {value:'M',description:'Male'},
      {value:'F',description:'Female'}
    ]

    this.dayList = JSON.parse(localStorage.getItem('days'));
    this.dayList.sort((a, b) => a> b ? 1 : a === b ? 0 : -1);

    this.monthList = JSON.parse(localStorage.getItem('month'));

    this.occupationList = JSON.parse(localStorage.getItem('occupations'));
    this.occupationList.sort((a, b) => a['description'] > b['description'] ? 1 : a['description'] === b['description'] ? 0 : -1);

  }

  proceed(){
    if(this.driverForm.valid){
      var form = this.driverForm.value;
      form.name = form.name.toString().toUpperCase();
      form.dob = form.doby.toString() + '-' + form.dobm + '-' + form.dobd;
      var prof = this.occupationList.filter(function(md){
        return md.code == form.occupation;
      });
      form.profession = prof[0].description;
      if(form.idtype == 'N'){
        form.nric = form.idNo;
        form.oldic = ''
      }else{
        form.nric = '';
        form.oldic = form.idNo
      }
      form.count = this.index;
      this.modalCtrl.dismiss({driver:form,isAdd: this.isAdd,index:this.index});
    }
  }

  close(){
    this.modalCtrl.dismiss(false);
  }

  addDash() {
    if(this.driverForm.value.idtype == 'N'){
      var ic = this.driverForm.value.idNo.replace(/\D/g, '');
      if (ic.length > 8) {
        ic = ic.slice(0, 6) + "-" + ic.slice(6, 8) + "-" + ic.slice(8);
      } 
      // else if (ic.length > 6) {
      //   ic = ic.slice(0, 6) + "-" + ic.slice(6, 8);
      // }
      this.driverForm.patchValue({idNo:ic})
      
      this.checkID(this.driverForm);
      if(ic.length > 5){
        this.getbirthdate();
      }
      if(ic.length == 14){
        this.getbirthdate();
        var g = parseInt(this.driverForm.value.idNo[this.driverForm.value.idNo.length - 1]);

        if(g%2 == 0){
          this.driverForm.patchValue({gender: 'F'});
        }else{
          this.driverForm.patchValue({gender: 'M'});
        }
      }
      
    }else{
      var ic = this.driverForm.value.idNo;
      this.driverForm.patchValue({idNo:ic.toUpperCase()});
    }
    
  }

  getbirthdate(){
    this.birthDate = moment.utc(this.driverForm.value.idNo.substring(0, 6), "YYMMDD");
    if (this.birthDate.isValid()) {
      if (this.birthDate.get('y') > this.now.get('y')) {
        this.birthDate.add(-100, 'y');
      }
      
      let dt = {
        doby: this.birthDate.get('y'),
        dobm: moment(this.birthDate).format('MM'),
        dobd: moment(this.birthDate).format('DD')
      }

      this.driverForm.patchValue(dt);
    }
  }

  checkID(searchform){
    var form = searchform.value;
    if(form.idtype == 'N'){        
      let regexpNumber = new RegExp("^\\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[-]?(\\d{2})[-]?(\\d{4})$");
      if(!regexpNumber.test(form.idNo)){
        searchform.controls['idNo'].setErrors({'invalid': true});
      }
    }else{
      
      searchform.controls['idNo'].updateValueAndValidity();
    }
  }

  idChanged(){
    if(this.driverForm.value.idtype == 'N'){
      this.iclength = 14;
      this.isNric = true;
      this.addDash();
    }else{
      this.iclength = 99;
      this.isNric = false;
    }
  }

}
