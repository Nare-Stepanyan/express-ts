import { ProductCategoryEnum } from "../enums/product-category.enum";

type Stock = {
  available: number;
  reserved: number;
  location: string;
};

type Address = {
  street: string;
  city?: string;
  state?: string;
  zip?: string;
};

type Manufacturer = {
  name?: string;
  country?: string;
  address: Address;
};

export interface IBaseProduct {
  name: string;
  description: string;
  price: number;
  category: ProductCategoryEnum;
  stock: Stock;
  tags: string[];
  rating: number;
  deleted: boolean;
  manufacturer?: Manufacturer;
}

export interface IProduct extends IBaseProduct {
  id: number;
}
export interface IProductsList {
  products: IProduct[];
}
