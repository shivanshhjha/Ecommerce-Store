export interface ShippingAddress {
        fullName: string;
        address1: string;
        area: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    }

    export interface OrderItem {
        productId: number;
        name: string;
        imagePath: string;
        price: number;
        quantity: number;
    }

    export interface Order {
        id: number;
        userId: string;
        shippingAddress: ShippingAddress;
        orderDate: string;
        orderItems: OrderItem[];
        total: number;
        orderStatus: string;
    }