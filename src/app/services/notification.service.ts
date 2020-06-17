import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
