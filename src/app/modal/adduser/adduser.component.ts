import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {

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
