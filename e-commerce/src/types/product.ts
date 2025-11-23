export interface Category{
    id:number;
    name:string;
    level:number;
    parentCategory?:Category;
}
export interface ProductSize{
    name:string;
    quantity:number;
}

export interface Product {
    id: number;
    title: string;
    brand: string;
    color: string;
    price: number;
    discountedPrice: number;
    discountPercent: number;
    imageUrl: string;
    quantity: number;
    description?: string;
    size: ProductSize[];
    category?: Category;
}

export interface ProductResponse{
    content:Array<Product>;
    totalPages:number;
    totalElements:number;
    size:number;
    number:number;
    last:boolean;
    first:boolean;
}
export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string;
    sizes?: string;
    minDiscount?: number;
    sort?: string;
    page: number;
    size: number;
}