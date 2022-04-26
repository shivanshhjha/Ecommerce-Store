export interface Product {
    productId: number;
    name: string;
    category: string;
    description: string;
    type: string;
    price: number;
    imagePath: string;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[];
    categories: string[];
    pageNumber: number;
    pageSize: number;
}