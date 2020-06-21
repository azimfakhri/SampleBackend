import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BindequipmentPage } from './bindequipment.page';

const routes: Routes = [
  {
    path: '',
    component: BindequipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BindequipmentPageRoutingModule {}
