import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private alertCtrl:AlertController) { }

  async alertNotification(title: string, msg: string) {
    let alert = await this.alertCtrl.create({
     header: title,
     message: msg,
     buttons:['Done']
    });
    alert.present();
  }

  async errorNotification(indicator,msg=""){
    var output='';
    switch (indicator) {
      case 1:
        output = config.message.error.desc1;
        break;
      case 2:
        output = config.message.error.desc2;
        break;
      case 3:
        output = msg;
        break;  
      case 401:
        output = config.message.error.desc401;
        break;  
      default:
        break;
    }
    let alert = await this.alertCtrl.create({
      header: config.message.error.title,
      message: output,
      buttons:['Done']
     });
     alert.present();
  }


  async DeleteConfirmation(title:string,msg:string){
    let confirmation = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          
        },
        {
          text: 'Delete',
          role: 'delete'
        }
      ]
     });
     return confirmation;
  }
}
