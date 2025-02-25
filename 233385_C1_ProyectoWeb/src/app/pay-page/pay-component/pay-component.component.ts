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
  bankData = {
    id: 0,
    cvv: '',
    accountNumber: '',
    id_user: 0,
    bank: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadShoppingBag();
    this.calculateTotalPrice();
    this.loadBankData();
  }

  loadShoppingBag() {
    if (isPlatformBrowser(this.platformId)) {
      const cart = localStorage.getItem('shoppingBag');
      if (cart) {
        this.shoppingBag = JSON.parse(cart);
      } else {
        this.shoppingBag = [];
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
      let shoppingBag = JSON.parse(localStorage.getItem('shoppingBag') || '[]');
      shoppingBag = shoppingBag.filter((product: any) => product.id !== productToRemove.id);
      localStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
      this.loadShoppingBag();
      this.calculateTotalPrice();
    }
  }

  loadBankData() {
    if (isPlatformBrowser(this.platformId)) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if (loggedInUser && loggedInUser.id) {
        this.bankData.id_user = loggedInUser.id;

        const bankDataStored = localStorage.getItem('bankData');
        if (bankDataStored) {
          this.bankData = JSON.parse(bankDataStored);
          this.formStatic = true;
          this.bankDataComplete = true;
        }
      }
    }
  }

  saveBankData() {
    if (this.validateBankData()) {
      this.bankData.id = new Date().getTime(); 
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('bankData', JSON.stringify(this.bankData));
      }
      Swal.fire('Datos bancarios agregados correctamente', '', 'success');
      this.formStatic = true;
      this.bankDataComplete = true;
    } else {
      Swal.fire('Por favor, verifique que los datos sean correctos', '', 'error');
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
      localStorage.removeItem('bankData');
    }
    this.bankData = { id: 0, cvv: '', accountNumber: '', id_user: this.bankData.id_user, bank: '' };
    this.formStatic = true; 
    this.bankDataComplete = false;
  }

  pay() {
    if (this.bankDataComplete) {
      Swal.fire('Compra efectuada con éxito', '', 'success');
      if (isPlatformBrowser(this.platformId)) {
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        history.push(...this.shoppingBag);
        localStorage.setItem('history', JSON.stringify(history));
        localStorage.removeItem('shoppingBag');
      }
      this.loadShoppingBag(); 
      this.totalPrice = 0;
    } else {
      Swal.fire('Por favor, complete sus datos bancarios antes de pagar', '', 'warning');
    }
  }
}
