import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  userForm:any;
  constructor(
    private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.SetForm();
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

  proceed(){
    if(this.userForm.valid){
      var form = this.userForm.value;

      if(form.password == form.confirmpassword){
        console.log(this.userForm.value);

        //API Code
        var res = true;
        if(res){
          this.modalCtrl.dismiss();
        }else{
          
        }
        
      }else{
        this.notification.alertNotification(config.message.alert.Warning,config.message.alert.PasswordNotMatch);
      }
    }
    
    
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
