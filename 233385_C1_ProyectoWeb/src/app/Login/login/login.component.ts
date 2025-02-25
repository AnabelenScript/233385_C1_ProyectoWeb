import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private adminUsers: { username: string; password: string }[] = [
    { username: 'admin1', password: 'admin123' },
    { username: 'admin2', password: 'admin456' }
  ];

  constructor(private router: Router) {}

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((u: any) => u.username === this.username && u.password === this.password);
    if (!user) {
      user = this.adminUsers.find(admin => admin.username === this.username && admin.password === this.password);
      if (user) {
        Swal.fire({
          icon: 'info',
          title: '¡Atención!',
          text: 'Eres un usuario administrador.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    if (user) {
      user.iniciosesion = true;
      if (users.some((u: any) => u.username === user.username)) {
        localStorage.setItem('users', JSON.stringify(users));
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user)); 
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Debes registrarte primero.',
        confirmButtonText: 'Aceptar'
      });
    }
  }  
}
