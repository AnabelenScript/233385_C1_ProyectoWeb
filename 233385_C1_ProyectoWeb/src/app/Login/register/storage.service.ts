import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storageKey = 'users';

  constructor() {}
  saveUser(userData: any) {
    const existingUsers = this.getUsers();
    existingUsers.push(userData);
    localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }


  hasUsers() {
    return this.getUsers().length > 0;
  }
}
