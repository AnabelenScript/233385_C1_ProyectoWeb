import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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
  shoes: Shoe[] = [
    {
      id: 1,
      name: 'Zapato Deportivo',
      price: 1400.00,
      color: 'Azul',
      size: 7,
      brand: 'Adidas',
      image: 'assets/zapatodeportivo.jpg',
      description: 'Un zapato deportivo cómodo y ligero para tu entrenamiento diario.'
    },
    {
      id: 2,
      name: 'Zapato Casual Mujer',
      price: 700.00,
      color: 'Rosa',
      size: 4,
      brand: 'Terra',
      image: 'assets/zapatocasual.jpg',
      description: 'Un zapato casual perfecto para ocasiones informales.'
    },
    {
      id: 3,
      name: 'Zapatos formales',
      price: 1200.00,
      color: 'Negro',
      size: 8,
      brand: 'Flexi',
      image: 'assets/zapato3.jpg',
      description: 'Calzado que brinda elegancia y comodidad con su suela interior acolchonada.'
    },
    {
      id: 4,
      name: 'Zapatillas casuales',
      price: 900.00,
      color: 'Negro',
      size: 5,
      brand: 'Capa de Ozono',
      image: 'assets/zapato4.jpg',
      description: 'Estas zapatillas negras son perfectas con interior de cuero de porcino, suela interna acolchonada y un glamour que nunca puede faltar.'
    },
    {
      id: 5,
      name: 'Botas de cuero',
      price: 2000.00,
      color: 'Marrón',
      size: 7,
      brand: 'Cowboys',
      image: 'assets/zapato5.jpg',
      description: 'Botas de cuero de vaca, con bordados artesanales, resistentes e impresionantes.'
    },
    {
      id: 6,
      name: 'Sandalias/Chanclas',
      price: 120.00,
      color: 'Rosa',
      size: 5,
      brand: 'PriceShoes',
      image: 'assets/zapatos6.jpg',
      description: 'Comodidad y estilo por el mismo precio. Sandalias de plástico, ligeras y frescas.'
    }
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

  ngOnInit() {
    this.loadShoes(); 
    this.loadCart(); 
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loadShoes(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedShoes = localStorage.getItem('shoes');
      if (storedShoes) {
        this.shoes = JSON.parse(storedShoes);
      }
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
      this.newShoe.id = this.shoes.length ? Math.max(...this.shoes.map(shoe => shoe.id)) + 1 : 1;
      this.shoes.push({ ...this.newShoe });
      this.saveShoes(); 
      this.resetNewShoe(); 
      this.toggleForm(); 
    }
  }

  modifyShoe(shoe: Shoe) {
    this.editShoe = { ...shoe }; 
  }
  startEditingShoe(shoe: any) {
    this.editShoe = { ...shoe };
  }
  saveEditedShoe() {
    if (this.editShoe) {
      const index = this.shoes.findIndex(shoe => shoe.id === this.editShoe!.id);
      if (index !== -1) {
        this.shoes[index] = { ...this.editShoe }; 
        this.saveShoes(); 
        this.editShoe = null; 
      }
    }
  }

  cancelEdit() {
    this.editShoe = null; 
  }

  saveShoes() {
    localStorage.setItem('shoes', JSON.stringify(this.shoes));
  }

  deleteShoe(id: number) {
    this.shoes = this.shoes.filter(shoe => shoe.id !== id);
    this.saveShoes(); 
    this.removeFromCart(id); 
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  resetNewShoe() {
    this.newShoe = { id: 0, name: '', price: 0, color: '', size: 0, brand: '', description: '', image: 'zapato3.jpg' };
  }
  addToCart(shoe: Shoe) {
    const shoppingBag = JSON.parse(localStorage.getItem('shoppingBag') || '[]'); 
    const foundIndex = shoppingBag.findIndex((item: CartItem) => item.id === shoe.id); 

    if (foundIndex > -1) {
      shoppingBag[foundIndex].quantity += 1;
    } else {
      shoppingBag.push({ id: shoe.id, shoe, quantity: 1 });
    }

    localStorage.setItem('shoppingBag', JSON.stringify(shoppingBag)); 
    this.cart = shoppingBag; 
  }

  getQuantity(shoeId: number): number {
    const item = this.cart.find(cartItem => cartItem.id === shoeId);
    return item ? item.quantity : 0; 
  }

  removeFromCart(shoeId: number) {
    this.cart = this.cart.filter(item => item.id !== shoeId); 
    localStorage.setItem('shoppingBag', JSON.stringify(this.cart));
  }
}
