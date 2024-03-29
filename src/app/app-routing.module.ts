import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then( m => m.CompaniesPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'equipment',
    loadChildren: () => import('./equipment/equipment.module').then( m => m.EquipmentPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then( m => m.DepartmentPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'bindemployee',
    loadChildren: () => import('./bindemployee/bindemployee.module').then( m => m.BindemployeePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'report-employee',
    loadChildren: () => import('./report-employee/report-employee.module').then( m => m.ReportEmployeePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then( m => m.PublicPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
