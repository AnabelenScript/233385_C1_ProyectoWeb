import { Component, OnInit } from '@angular/core';
import { AuthService } from './logService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateUserRole(); 
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar status:', this.isSidebarOpen);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.updateUserRole(); 
    this.closeSidebar();
  }

  updateUserRole() {
    this.userRole = this.authService.getUserRole(); 
  }

  getUsername(): string {
    if (this.userRole === 'admin') {
      return 'Administrador';
    } else if (this.userRole === 'user') {
      const currentUser = this.authService.getLoggedUser();
      return currentUser ? currentUser.username : 'Invitado';
    }
    return 'Invitado';
  }

  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }
  
  isUserLoggedIn(): boolean {
    return this.userRole === 'user';
  }
}
