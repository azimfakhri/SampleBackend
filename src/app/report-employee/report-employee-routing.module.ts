import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportEmployeePage } from './report-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ReportEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportEmployeePageRoutingModule {}
