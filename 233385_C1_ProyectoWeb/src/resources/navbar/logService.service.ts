import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('isLoggedUser');
    }
    return false;
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isLoggedUser'); 
    }
    return null;
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
      localStorage.removeItem('isLoggedUser');
      localStorage.removeItem('user'); 
      localStorage.removeItem('admin');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.forEach((user: any) => {
        user.iniciosesion = false;
      });
      localStorage.setItem('users', JSON.stringify(users)); 
    }
  }
}
