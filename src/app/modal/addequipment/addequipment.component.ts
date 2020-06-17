import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addequipment',
  templateUrl: './addequipment.component.html',
  styleUrls: ['./addequipment.component.scss'],
})
export class AddequipmentComponent implements OnInit {
  sn:any;
  constructor(
    private modalCtrl:ModalController,
    public builder : FormBuilder,
    public navParams: NavParams
  ) { }

  ngOnInit() {}

  proceed(){
    console.log('test');
  }

  close(){
    this.modalCtrl.dismiss(false);
  }
}
