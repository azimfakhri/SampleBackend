import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import * as config from '../config'

@Component({
  selector: 'app-bindequipment',
  templateUrl: './bindequipment.page.html',
  styleUrls: ['./bindequipment.page.scss'],
})
export class BindequipmentPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private navCtrl : NavController,
    private route : ActivatedRoute,
    private router : Router,
    private clientservice: ClientService,
    private notification:NotificationService,
    public loading: LoadingController,
  ) { }

  ngOnInit() {
  }

}
