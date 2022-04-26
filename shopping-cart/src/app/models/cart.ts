export interface CartItem {
    productId: number;
    name: string;
    category: string;
    type: string;
    price: number;
    imagePath: string;
    quantity: number;
}

export interface Cart {
    id: number;
    userId: string;
    items: CartItem[];
}
