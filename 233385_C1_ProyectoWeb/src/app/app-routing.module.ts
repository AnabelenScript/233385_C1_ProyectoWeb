import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../mainpage/content/content.component';
import { PayComponentComponent } from './pay-page/pay-component/pay-component.component';
import { RegisterComponent } from './Login/register/register.component';
import { LoginComponent } from './Login/login/login.component';
import { ListComponent } from './user-list/list/list.component';

const routes: Routes = [
  {path: "home", component: ContentComponent},
  {path: "shopbag", component: PayComponentComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "userslist", component: ListComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
