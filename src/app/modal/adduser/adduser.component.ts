import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  userForm:any;
  company:any;
  constructor(
    private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private adminservice:AdminService,
    private notification:NotificationService,
    public loading : LoadingController,
  ) { }

  ngOnInit() {
    this.SetForm();
    this.company = this.navParams.get('company');
  }

  SetForm(){
    this.userForm = this.builder.group({
      'userFullName':[
        '',[Validators.required]
      ],
      'username':[
        '',[Validators.required]
      ],
      'password':[
        '',[Validators.required]
      ],
      'confirmpassword':[
        '',[Validators.required]
      ]
    })
  }

  async proceed(){
    if(this.userForm.valid){
      let loader = await this.loading.create({
        message:'Please wait.'
      });
      
      loader.present();

      var form = this.userForm.value;

      if(form.password == form.confirmpassword){

        //API Code
        const res = await this.adminservice.AddNewUser(this.company.companyId,this.userForm.value);
        if(res['code'] == "0"){
          this.notification.alertNotification(config.message.alert.Success,config.message.alert.SuccessMsg);
          this.modalCtrl.dismiss();
         }else{
           this.notification.errorNotification(res['code'],res['msg']);
         }
        
      }else{
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.PasswordNotMatch);
      }
      loader.dismiss();
    }
    
    
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
