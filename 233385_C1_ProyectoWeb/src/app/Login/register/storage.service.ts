import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  iduser: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storageKey = 'users';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveUser(userData: User) {
    if (isPlatformBrowser(this.platformId)) {
      const existingUsers = this.getUsers();
      existingUsers.push(userData);
      localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
    }
  }

  getUsers(): User[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedUsers = localStorage.getItem(this.storageKey);
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
    return [];
  }

  deleteUser(iduser: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const users = this.getUsers();
      const filteredUsers = users.filter(user => user.iduser !== iduser);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredUsers));
    }
  }

  updateUser(updatedUser: User): void {
    if (isPlatformBrowser(this.platformId)) {
      const users = this.getUsers();
      const index = users.findIndex(user => user.iduser === updatedUser.iduser);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(this.storageKey, JSON.stringify(users));
      }
    }
  }

  hasUsers(): boolean {
    return this.getUsers().length > 0;
  }
}
