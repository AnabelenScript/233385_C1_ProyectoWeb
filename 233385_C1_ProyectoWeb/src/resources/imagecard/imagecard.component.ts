import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


interface Shoe {
  id: number;
  name: string;
  price: number;
  color: string;
  size: number;
  brand: string;
  image: string;
  description: string;
}

interface CartItem {
  id: number; 
  shoe: Shoe;
  quantity: number;
}

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.css']
})
export class ImagecardComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:3000/zapatos'; 
  shoes: Shoe[] = [
  ];

  showForm: boolean = false;
  newShoe: Shoe = { 
    id: 0,
    name: '',
    price: 0,
    color: '',
    size: 0,
    brand: '',
    description: '',
    image: 'zapato3.jpg' 
  };

  editShoe: Shoe | null = null; 
  cart: CartItem[] = []; 
  isLogged: boolean = false; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private http: HttpClient
) {}
  isUser: boolean = false;
isAdmin: boolean = false;

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

loadShoes(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.http.get<Shoe[]>(`${this.apiUrl}`).subscribe(
      (data) => {
        this.shoes = data;
      },
      (error) => {
        console.error('Error al obtener los zapatos:', error);
      }
    );
  }
}


  loadCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('shoppingBag');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
    }
  }

  addNewShoe() {
    if (this.newShoe.name && this.newShoe.price) {
      const shoeToAdd = { 
        ...this.newShoe, 
        id: undefined,   
        image: '1'     
      };
      this.http.post<Shoe>(`${this.apiUrl}`, shoeToAdd).subscribe(
        (data) => {
          this.shoes.push(data);
          this.resetNewShoe();
          this.toggleForm();
          Swal.fire({
            icon: 'success',
            title: '¡Zapato agregado!',
            text: 'El zapato ha sido agregado correctamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        (error) => {
          console.error('Error al agregar el zapato:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar el zapato',
            text: 'Hubo un problema al agregar el zapato, por favor intente de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan campos',
        text: 'Por favor, asegúrese de completar todos los campos obligatorios.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
  

  modifyShoe(shoe: Shoe) {
    this.editShoe = { ...shoe }; 
  }

  startEditingShoe(shoe: Shoe) {
    this.editShoe = { ...shoe };
  }

  saveEditedShoe() {
    if (this.editShoe) {
    
      this.http.put(`${this.apiUrl}/${this.editShoe.id}`, this.editShoe).subscribe(
        (response) => {
         
          const index = this.shoes.findIndex(shoe => shoe.id === this.editShoe!.id);
          if (index !== -1) {
            this.shoes[index] = { ...this.editShoe as Shoe };  
          }
          this.editShoe = null; 
  
          Swal.fire({
            icon: 'success',
            title: '¡Zapato actualizado!',
            text: 'El zapato ha sido actualizado correctamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        (error) => {
          console.error('Error al actualizar el zapato:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el zapato',
            text: 'Hubo un problema al actualizar el zapato, por favor intente de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
  

  cancelEdit() {
    this.editShoe = null; 
  }

  saveShoes() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('shoes', JSON.stringify(this.shoes));
    }
  }

  deleteShoe(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        this.shoes = this.shoes.filter(shoe => shoe.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Zapato eliminado',
          text: 'El zapato ha sido eliminado correctamente.',
          confirmButtonText: 'Aceptar'
        });
        this.removeFromCart(id); 
      },
      (error) => {
        console.error('Error al eliminar el zapato:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el zapato',
          text: 'Hubo un problema al eliminar el zapato, por favor intente de nuevo.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
  

  toggleForm() {
    this.showForm = !this.showForm;
  }

  resetNewShoe() {
    this.newShoe = { id: 0, name: '', price: 0, color: '', size: 0, brand: '', description: '', image: 'zapato3.jpg' };
  }

  addToCart(shoe: Shoe) {
    if (isPlatformBrowser(this.platformId)) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((user: any) => user.iniciosesion === true);
  
      if (currentUser) {
        if (!currentUser.shoppingBag) {
          currentUser.shoppingBag = []; 
        }
  
        const foundIndex = currentUser.shoppingBag.findIndex((item: CartItem) => item.id === shoe.id);
  
        if (foundIndex > -1) {
          currentUser.shoppingBag[foundIndex].quantity += 1; 
        } else {
          currentUser.shoppingBag.push({ id: shoe.id, shoe, quantity: 1 });
        }
  
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
    this.cart = this.cart.filter(item => item.id !== shoeId); 
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('shoppingBag', JSON.stringify(this.cart));
    }
  }
}
