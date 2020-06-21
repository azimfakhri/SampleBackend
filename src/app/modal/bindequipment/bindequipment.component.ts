import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bindequipment',
  templateUrl: './bindequipment.component.html',
  styleUrls: ['./bindequipment.component.scss'],
})
export class BindequipmentComponent implements OnInit {
  equipment:any;
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    private clientservice:ClientService,
    private notification:NotificationService,
    public loading : LoadingController,
  ) { }

  ngOnInit() {
    this.equipment = this.navParams.get('equipment');
    console.log(this.equipment)
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
