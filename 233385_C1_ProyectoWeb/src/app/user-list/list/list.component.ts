import { Component, OnInit } from '@angular/core'; 
import { StorageService, User } from '../../Login/register/storage.service'; 

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[] = []; 
  newUser: User = { iduser: 0, name: '', lastname: '', username: '', email: '', password: '' }; 
  userToEdit: User | null = null; 

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.storageService.getUsers(); 
    console.log('Usuarios almacenados:', this.users); 
  }

  deleteUser(iduser: number): void {
    this.storageService.deleteUser(iduser);
    this.loadUsers(); 
  }

  editUser(user: User): void {
    this.userToEdit = { ...user }; 
  }

  updateUser(): void {
    if (this.userToEdit) {
      this.storageService.updateUser(this.userToEdit);
      this.userToEdit = null; 
      this.loadUsers(); 
    }
  }

  addUser(): void {
    const newUser = { ...this.newUser, iduser: this.users.length + 1 }; 
    this.storageService.saveUser(newUser);
    this.newUser = { iduser: 0, name: '', lastname: '', username: '', email: '', password: '' }; 
    this.loadUsers(); 
  }
}
