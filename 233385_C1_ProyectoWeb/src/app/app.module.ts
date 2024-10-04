import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from '../resources/resources.module';
import { ContentComponent } from '../mainpage/content/content.component';
import { MainpageModule } from '../mainpage/mainpage.module';
import { LoginModule } from './Login/login.module';
import { PayPageModule } from './pay-page/pay-page.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResourcesModule,
    MainpageModule,
    LoginModule,
    PayPageModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
