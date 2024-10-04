import { Component } from '@angular/core';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.css']
})
export class ImagecardComponent {
  shoes = [
    {
      id: 1,
      name: 'Zapato Deportivo',
      price: 1400.00,
      color: 'Azul',
      size: 7,
      brand: 'Adidas',
      image: 'zapatodeportivo.jpg',
      description: 'Un zapato deportivo cómodo y ligero para tu entrenamiento diario.'
    },
    {
      id: 2,
      name: 'Zapato Casual Mujer',
      price: 700.00,
      color: 'Rosa',
      size: 4,
      brand: 'Terra',
      image: 'zapatocasual.jpg',
      description: 'Un zapato casual perfecto para ocasiones informales.'
    },
    {
      id: 3,
      name: 'Zapatos formales',
      price: 1200.00,
      color: 'Negro',
      size: 8,
      brand: 'Flexi',
      image: 'zapato3.jpg',
      description: 'Calzado que brinda elegancia y comodidad con su suela interior acolchonada'
    },
    {
      id: 4,
      name: 'Zapatillas casuales',
      price: 900.00,
      color: 'Negro',
      size: 5,
      brand: 'Capa de Ozono',
      image: 'zapato4.jpg',
      description: 'Estas zapatillas negras son perfectas con interior de cuero de porcino, suela interna acolchonada y un glamour que nunca peude faltar'
    },
    {
      id: 5,
      name: 'Botas de cuero',
      price: 2000.00,
      color: 'Marrón',
      size: 7,
      brand: 'Cowboys',
      image: 'zapato5.jpg',
      description: 'Botas de cuero de vaca, con bordados artesanales, resistentes e impresionantes'
    },
    {
      id: 6,
      name: 'Sandalias/Chanclas',
      price: 120.00,
      color: 'Rosa',
      size: 5,
      brand: 'PriceShoes',
      image: 'zapatos6.jpg',
      description: 'Comodidad y estilo por el mismo precio. Sandalias de plastico, ligeras y frescas.'
    }
  ];

  // Verifica si localStorage está disponible
  isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Agrega el producto al carrito de compras
  addToCart(shoe: any) {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage no está disponible en este entorno.');
      return;
    }

    // Recuperar los productos actuales del carrito
    let cart = JSON.parse(localStorage.getItem('shoppingBag') || '[]');

    // Ver si el producto ya está en el carrito
    const foundIndex = cart.findIndex((item: any) => item.id === shoe.id);

    if (foundIndex > -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      cart[foundIndex].quantity += 1;
    } else {
      // Si no está, agregarlo con cantidad 1
      cart.push({ ...shoe, quantity: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('shoppingBag', JSON.stringify(cart));
  }

  // Obtiene la cantidad de un producto en el carrito
  getQuantity(shoeId: number): number {
    if (!this.isLocalStorageAvailable()) {
      return 0;
    }

    const cart = JSON.parse(localStorage.getItem('shoppingBag') || '[]');
    const product = cart.find((item: any) => item.id === shoeId);
    return product ? product.quantity : 0;
  }
}
