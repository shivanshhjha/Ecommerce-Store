import { Cart } from "./cart";

export interface User {
    emailId: string;
    phoneNumber: string;
    token: string;
    cart?: Cart;
}