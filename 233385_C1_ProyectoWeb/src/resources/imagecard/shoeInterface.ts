
export interface Shoe {
    id: number;
    name: string;
    price: number;
    color: string;
    size: number;
    brand: string;
    image: string;
    description: string;
  }

  export interface CartItem {
    id: number;
    shoe: Shoe;
    quantity: number;
  }