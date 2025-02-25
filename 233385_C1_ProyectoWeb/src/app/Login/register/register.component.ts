import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private storageService: StorageService) {}

  saveData() {
    if (!this.name || !this.lastname || !this.username || !this.email || !this.password) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUserId = users.length > 0 ? users[users.length - 1].iduser + 1 : 1; 

    const userData = {
      iduser: newUserId,
      name: this.name,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.storageService.saveUser(userData);
    Swal.fire({
      title: 'Datos guardados',
      text: 'Los datos se han guardado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.lastname = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }
}
