import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPageRoutingModule } from './public-routing.module';

import { PublicPage } from './public.page';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPageRoutingModule,
    LayoutModule
  ],
  declarations: [PublicPage]
})
export class PublicPageModule {}
