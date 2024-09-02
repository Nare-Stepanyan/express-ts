import { ProductCategoryEnum } from "../enums/product-category.enum";

type Stock = {
  available: number;
  reserved: number;
  location: string;
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
}

export interface IProduct extends IBaseProduct {
  id: number;
}
export interface IProductsList {
  products: IProduct[];
}
