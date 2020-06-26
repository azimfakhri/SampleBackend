import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BindemployeePageRoutingModule } from './bindemployee-routing.module';

import { BindemployeePage } from './bindemployee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BindemployeePageRoutingModule
  ],
  declarations: [BindemployeePage]
})
export class BindemployeePageModule {}
