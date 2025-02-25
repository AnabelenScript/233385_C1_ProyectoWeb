// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.some((user: any) => user.iniciosesion === true);
    }
    return false;
  }

  getLoggedUser(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find((user: any) => user.iniciosesion === true) || null;
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);
      
      if (currentUser) {
        currentUser.iniciosesion = false; // Reset login status
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }
}
