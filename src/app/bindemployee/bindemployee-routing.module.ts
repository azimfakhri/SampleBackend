import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BindemployeePage } from './bindemployee.page';

const routes: Routes = [
  {
    path: '',
    component: BindemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BindemployeePageRoutingModule {}
