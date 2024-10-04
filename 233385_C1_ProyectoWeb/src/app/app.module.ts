import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from '../resources/resources.module';
import { ContentComponent } from '../mainpage/content/content.component';
import { MainpageModule } from '../mainpage/mainpage.module';
import { PayComponentComponent } from './pay-page/pay-component/pay-component.component';
import { LoginModule } from './Login/login.module';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PayComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResourcesModule,
    MainpageModule,
    LoginModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
