import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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


export function tokenGetter() {
  return sessionStorage.getItem("user_token");
}
@NgModule({
  declarations: [
    AppComponent,
    AdditionaldriverComponent,
    AddcompanyComponent,
    ResetpasswordComponent,
    AddequipmentComponent
  ],
  entryComponents: [
    AdditionaldriverComponent,
    AddcompanyComponent,
    ResetpasswordComponent,
    AddequipmentComponent
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
