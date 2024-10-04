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

  constructor(private router: Router) {}

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === this.username && u.password === this.password);
    
    if (user) {
      user.iniciosesion = true;
      localStorage.setItem('users', JSON.stringify(users));
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
