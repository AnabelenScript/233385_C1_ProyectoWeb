// navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from './logService.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarOpen = false;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar status:', this.isSidebarOpen);
  }
  
  closeSidebar() {
    this.isSidebarOpen = false; 
  }

  logout() {
    this.authService.logout(); // Utiliza el servicio para hacer logout
    this.closeSidebar();
  }

  getUsername(): string {
    const currentUser = this.authService.getLoggedUser();
    return currentUser ? currentUser.username : 'Invitado';
  }
}

