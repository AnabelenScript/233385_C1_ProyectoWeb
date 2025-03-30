import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-component',
  templateUrl: './pay-component.component.html',
  styleUrls: ['./pay-component.component.css']
})
export class PayComponentComponent implements OnInit {
  shoppingBag: any[] = [];
  totalPrice: number = 0;
  formStatic: boolean = true;
  bankDataComplete: boolean = false;
  bankData = { cvv: '', accountNumber: '', bank: '' };
  username: string = '';
  history: any[] = [];  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadUserData();
    this.loadShoppingBag();
    this.loadHistory();  
    this.calculateTotalPrice();
    this.loadBankData();
  }

  loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);
      this.username = currentUser ? currentUser.username : 'Invitado';
    }
  }

  loadShoppingBag() {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true); 

      if (currentUser && currentUser.shoppingBag) {
        this.shoppingBag = currentUser.shoppingBag; 
      } else {
        this.shoppingBag = []; 
      }
    }
  }

  loadHistory() {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);

      if (currentUser && currentUser.history) {
        this.history = currentUser.history;
      } else {
        this.history = [];
      }
    }
  }
  
  calculateTotalPrice() {
    this.totalPrice = this.shoppingBag.reduce((total, product) => {
      return total + (product.shoe.price * product.quantity);
    }, 0);
  }

  removeProduct(productToRemove: any) {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.username === this.username);

      if (currentUser) {
        currentUser.shoppingBag = currentUser.shoppingBag.filter((product: any) => product.id !== productToRemove.id);
        localStorage.setItem('users', JSON.stringify(users));
        this.loadShoppingBag();
        this.calculateTotalPrice();
      }
    }
  }

  loadBankData() {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.username === this.username);

      if (currentUser && currentUser.bankData) {
        this.bankData = currentUser.bankData;
        this.formStatic = true;
        this.bankDataComplete = true;
      }
    }
  }

  saveBankData() {
    if (this.validateBankData()) {
      if (isPlatformBrowser(this.platformId)) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find((user: any) => user.username === this.username);

        if (currentUser) {
          currentUser.bankData = this.bankData;
          localStorage.setItem('users', JSON.stringify(users));
          Swal.fire('Datos bancarios agregados correctamente', '', 'success');
          this.formStatic = true;
          this.bankDataComplete = true;
        } else {
          Swal.fire('Error al guardar los datos bancarios', 'Usuario no encontrado', 'error');
        }
      }
    } else {
      Swal.fire('Error al guardar los datos bancarios', 'Verifique que los datos sean correctos', 'error');
    }
  }

  validateBankData() {
    return this.bankData.cvv.length === 4 && this.bankData.accountNumber.length === 16;
  }

  editBankData() {
    this.formStatic = false;
  }

  deleteBankData() {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.username === this.username);

      if (currentUser) {
        delete currentUser.bankData;
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire('Datos bancarios eliminados', '', 'success');
        this.bankData = { cvv: '', accountNumber: '', bank: '' };
        this.formStatic = true;
        this.bankDataComplete = false;
      }
    }
  }

  pay() {
    if (this.bankDataComplete && this.shoppingBag.length > 0) {
      if (isPlatformBrowser(this.platformId)) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find((user: any) => user.username === this.username);

        if (currentUser) {
          currentUser.history = currentUser.history || []; 
          this.shoppingBag.forEach(product => {
            currentUser.history.push(product);
          });
          localStorage.setItem('users', JSON.stringify(users));
          Swal.fire('Compra realizada con éxito', '', 'success');
          this.shoppingBag = []; 
          this.calculateTotalPrice();
          this.loadHistory(); 
        }
      }
    } else {
      Swal.fire('Error al realizar el pago', 'Verifique que todos los campos estén completos y que haya productos en la bolsa', 'error');
    }
  }
}
