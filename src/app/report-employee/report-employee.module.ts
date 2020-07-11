import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportEmployeePageRoutingModule } from './report-employee-routing.module';

import { ReportEmployeePage } from './report-employee.page';
import { LayoutModule } from '../layout/layout.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportEmployeePageRoutingModule,
    LayoutModule,
    NgxPaginationModule
  ],
  declarations: [ReportEmployeePage]
})
export class ReportEmployeePageModule {}
