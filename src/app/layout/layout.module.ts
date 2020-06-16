import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';

/***************** Angular Material Modules *****************/
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
/************************************************************************/

const AngularMatModules = [
  MatRadioModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatListModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatMenuModule,
  MatChipsModule,
  MatAutocompleteModule
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ...AngularMatModules,
  ],
  declarations: [
    SidenavComponent,
    FooterComponent
  ],
  exports: [
    SidenavComponent,
    FooterComponent,
    ...AngularMatModules,
  ]
})
export class LayoutModule {}
