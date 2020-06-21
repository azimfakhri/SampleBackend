import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import * as config from '../config'

@Component({
  selector: 'app-bindemployee',
  templateUrl: './bindemployee.page.html',
  styleUrls: ['./bindemployee.page.scss'],
})
export class BindemployeePage implements OnInit {

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
