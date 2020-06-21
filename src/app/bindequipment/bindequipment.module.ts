import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BindequipmentPageRoutingModule } from './bindequipment-routing.module';

import { BindequipmentPage } from './bindequipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BindequipmentPageRoutingModule
  ],
  declarations: [BindequipmentPage]
})
export class BindequipmentPageModule {}
