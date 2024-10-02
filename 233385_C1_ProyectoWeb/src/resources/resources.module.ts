import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImagecardComponent } from './imagecard/imagecard.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ImagecardComponent
  ],
  imports: [
    CommonModule
  ],

  exports:[
    NavbarComponent,
    FooterComponent, 
    ImagecardComponent
  ]
})
export class ResourcesModule { }
