import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImagecardComponent } from './imagecard/imagecard.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ImagecardComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],

  exports:[
    NavbarComponent,
    FooterComponent, 
    ImagecardComponent
  ]
})
export class ResourcesModule { }
