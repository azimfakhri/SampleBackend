import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportEmployeePageRoutingModule } from './report-employee-routing.module';

import { ReportEmployeePage } from './report-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportEmployeePageRoutingModule
  ],
  declarations: [ReportEmployeePage]
})
export class ReportEmployeePageModule {}
