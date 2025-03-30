import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from '../resources/resources.module';
import { ContentComponent } from '../mainpage/content/content.component';
import { MainpageModule } from '../mainpage/mainpage.module';
import { LoginModule } from './Login/login.module';
import { PayPageModule } from './pay-page/pay-page.module';
import { UserListModule } from './user-list/user-list.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

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
    PayPageModule,
    UserListModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
