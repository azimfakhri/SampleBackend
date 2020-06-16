import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams, AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss'],
})
export class AddcompanyComponent implements OnInit {
  companyForm:any;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(
    private modalCtrl:ModalController,
    private alertCtrl: AlertController,
    public builder : FormBuilder,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.SetForm();
  }

  SetForm(){
    this.companyForm = this.builder.group({
      'companyName':[
        '',[Validators.required]
      ],
      'logo':[
        '',[Validators.required]
      ],
      'userFullName':[
        '',[Validators.required]
      ],
      'username':[
        '',[Validators.required]
      ],
      'password':[
        '',[Validators.required]
      ],
    })
  }

  close(){
    this.modalCtrl.dismiss(false);
  }

  fileProgress(fileInput: any){
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  proceed(){
    console.log(this.companyForm.value);
  }

  async alertNotification(title: string, msg: string) {
    let alert = await this.alertCtrl.create({
     header: title,
     message: msg,
     buttons:['Done']
    });
    alert.present();
  }
}
