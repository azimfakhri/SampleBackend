import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  currentpassword:any;
  newpassword:any;
  confirmpassword:any;

  com:any;
  constructor(
    public navParams: NavParams,
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
    this.com = this.navParams.get('com');
    console.log(this.com);
  }

  close(){
    this.modalCtrl.dismiss(false);
  }


}
