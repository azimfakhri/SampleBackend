import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  appitems:any;
  appItemsClient:any;
  menu:any;
  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      "form",
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/form.svg')
    );

    this.appitems = [
      {
        label: 'Home',
        icon: 'home',
        link: 'home'
      },
      {
        label: 'Companies',
        icon: 'business',
        link: 'companies'
      }
    ];

    this.appItemsClient = [
      {
        label: 'Home',
        icon: 'home',
        link: 'home'
      },
      {
        label: 'Department',
        icon: 'business',
        items: [
          {
            label: 'Manage Department',
            link: 'department',
            icon: 'settings'
          },
          {
            label: 'Manage Equipment',
            link: 'equipment',
            icon: 'swap_horiz'
          }
        ]
      },
      {
        label: 'Employee',
        icon: 'people',
        items: [
          {
            label: 'Manage Employee',
            link: 'employee',
            icon: 'settings'
          },
          {
            label: 'Bind Employee',
            link: 'bindemployee',
            icon: 'swap_horiz'
          }
        ]
      },
    ];

    if(sessionStorage.getItem('usertype') == "1"){
      this.menu = this.appitems;
    }else{
      this.menu = this.appItemsClient;
    }
  }


  selectedItem(event){
  }

  
}
