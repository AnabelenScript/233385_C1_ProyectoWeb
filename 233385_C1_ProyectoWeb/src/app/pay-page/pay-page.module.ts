import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesModule } from '../../resources/resources.module';
import { PayComponentComponent } from './pay-component/pay-component.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PayComponentComponent
  ],
  imports: [
    CommonModule,
    ResourcesModule, 
    FormsModule
  ],
  exports:[
    PayComponentComponent
  ]
})
export class PayPageModule { }
