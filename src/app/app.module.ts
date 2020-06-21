import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@auth0/angular-jwt';
import { LayoutModule } from './layout/layout.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdditionaldriverComponent } from './modal/additionaldriver/additionaldriver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AddcompanyComponent } from './modal/addcompany/addcompany.component';
import { ResetpasswordComponent } from './modal/resetpassword/resetpassword.component';
import { NotificationService } from './services/notification.service';
import { AddequipmentComponent } from './modal/addequipment/addequipment.component';
import { AdduserComponent } from './modal/adduser/adduser.component';
import { AuthInterceptor } from './services/interceptor';
import { AdminService } from './services/admin.service';
import { ImageService } from './services/image.service';
import { ClientService } from './services/client.service';
import { AdddepartmentComponent } from './modal/adddepartment/adddepartment.component';
import { EditdepartmentComponent } from './modal/editdepartment/editdepartment.component';
import { AddemployeeComponent } from './modal/addemployee/addemployee.component';
import { ViewupdateEmployeeComponent } from './modal/viewupdate-employee/viewupdate-employee.component';
import { ViewupdateprofileComponent } from './modal/viewupdateprofile/viewupdateprofile.component';


export function tokenGetter() {
  return sessionStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    AdditionaldriverComponent,
    AddcompanyComponent,
    ResetpasswordComponent,
    AddequipmentComponent,
    AdduserComponent,
    AdddepartmentComponent,
    EditdepartmentComponent,
    AddemployeeComponent,
    ViewupdateEmployeeComponent,
    ViewupdateprofileComponent
  ],
  entryComponents: [
    AdditionaldriverComponent,
    AddcompanyComponent,
    ResetpasswordComponent,
    AddequipmentComponent,
    AdduserComponent,
    AdddepartmentComponent,
    EditdepartmentComponent,
    AddemployeeComponent,
    ViewupdateEmployeeComponent,
    ViewupdateprofileComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost"]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    NotificationService,
    AdminService,
    ImageService,
    ClientService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
