import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar status:', this.isSidebarOpen);
  }
  
  closeSidebar() {
    this.isSidebarOpen = false; 
  }

  logout() {
    this.closeSidebar(); 
  }

  getUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((u: any) => u.iniciosesion === true);
      return currentUser ? currentUser.username : 'Invitado'; 
    }
    return 'Invitado'; 
  }
}
