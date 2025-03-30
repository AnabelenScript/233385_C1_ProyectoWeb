import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { Shoe, CartItem } from './shoeInterface';
import { ShoeService } from './shoeService';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.css'],
})
export class ImagecardComponent implements OnInit {
  shoes: Shoe[] = [];
  showForm: boolean = false;
  newShoe: Shoe = { id: 0, name: '', price: 0, color: '', size: 0, brand: '', description: '', image: 'zapato5.jpg' };
  editShoe: Shoe | null = null;
  cart: CartItem[] = [];
  isLogged = false;
  isUser = false;
  isAdmin = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private shoeService: ShoeService) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const loggedUser = localStorage.getItem('isLoggedUser');
      this.isUser = loggedUser === 'user';
      this.isAdmin = loggedUser === 'admin';
      this.isLogged = !!loggedUser;
      this.loadShoes();
      this.loadCart();
    }
  }

  loadShoes() {
    this.shoeService.getShoes().subscribe(
      (data) => { this.shoes = data; },
      (error) => console.error('Error al obtener los zapatos:', error)
    );
  }

  addNewShoe() {
    if (this.newShoe.name && this.newShoe.price) {
      const shoeToAdd = { ...this.newShoe, id: 0, image: '1' };
      this.shoeService.addShoe(shoeToAdd).subscribe(
        (data) => {
          this.shoes.push(data);
          this.showAlert('¡Zapato agregado!', 'El zapato ha sido agregado correctamente.');
        },
        (error) => this.showAlert('Error al agregar el zapato', 'Hubo un problema al agregar el zapato.')
      );
    }
  }

  showAlert(title: string, text: string) {
    Swal.fire({ icon: 'success', title, text, confirmButtonText: 'Aceptar' });
  }

  loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('shoppingBag');
      if (storedCart) this.cart = JSON.parse(storedCart);
    }
  }

  modifyShoe(shoe: Shoe) { this.editShoe = { ...shoe }; }

  saveEditedShoe() {
    if (this.editShoe) {
      this.shoeService.updateShoe(this.editShoe).subscribe(
        (response) => {
          const index = this.shoes.findIndex((shoe) => shoe.id === this.editShoe!.id);
          if (index !== -1) this.shoes[index] = { ...this.editShoe as Shoe };
          this.editShoe = null;
          this.showAlert('¡Zapato actualizado!', 'El zapato ha sido actualizado correctamente.');
        },
        (error) => this.showAlert('Error al actualizar el zapato', 'Hubo un problema al actualizar el zapato.')
      );
    }
  }
  cancelEdit() { this.editShoe = null; }

  deleteShoe(id: number) {
    this.shoeService.deleteShoe(id).subscribe(
      () => {
        this.shoes = this.shoes.filter((shoe) => shoe.id !== id);
        this.showAlert('Zapato eliminado', 'El zapato ha sido eliminado correctamente.');
        this.removeFromCart(id);
      },
      (error) => this.showAlert('Error al eliminar el zapato', 'Hubo un problema al eliminar el zapato.')
    );
  }
  toggleForm() { this.showForm = !this.showForm; }

  addToCart(shoe: Shoe) {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);
      if (currentUser) {
        if (!currentUser.shoppingBag) currentUser.shoppingBag = [];
        const foundIndex = currentUser.shoppingBag.findIndex((item: CartItem) => item.id === shoe.id);
        if (foundIndex > -1) currentUser.shoppingBag[foundIndex].quantity += 1;
        else currentUser.shoppingBag.push({ id: shoe.id, shoe, quantity: 1 });
        localStorage.setItem('users', JSON.stringify(users));
        this.cart = currentUser.shoppingBag;
      }
    }
  }

  getQuantity(shoeId: number): number {
    if (this.isLogged) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);
      if (currentUser && currentUser.shoppingBag) {
        const item = currentUser.shoppingBag.find((cartItem: CartItem) => cartItem.shoe.id === shoeId);
        return item ? item.quantity : 0;
      }
    }
    return 0;
  }

  removeFromCart(shoeId: number) {
    this.cart = this.cart.filter((item) => item.id !== shoeId);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('shoppingBag', JSON.stringify(this.cart));
    }
  }
}
