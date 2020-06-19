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
      // {
      //   label: 'Employee',
      //   icon: 'people',
      //   items: [
      //     {
      //       label: 'List Employee',
      //       link: 'employee',
      //       icon: 'person_search'
      //     },
          
      //   ]
      // },
      {
        label: 'Companies',
        icon: 'business',
        items: [
          {
            label: 'List Companies',
            link: 'companies',
            icon: 'domain_disabled'
          },
          
        ]
      }
    ];
  }

  navigateURL(url){
    this.router.navigateByUrl('/'+ url, { replaceUrl: true });
  }

  selectedItem(event){
    console.log(event);
  }

  
}
