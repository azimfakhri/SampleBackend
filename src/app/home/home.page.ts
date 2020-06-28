import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  publicurl:string = null;
  constructor(
    public authservice: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('usertype') == '2'){
      this.publicurl = environment.Public + sessionStorage.getItem('companyId');
    }else{
      this.publicurl = null;
    }
  }
}
