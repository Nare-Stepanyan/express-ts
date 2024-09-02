import { IProduct } from "../types/interfaces/product.interface";

type ProductValidationErrors = {
  price?: string;
  stockAvailable?: string;
};

export const productValidator = (
  product: IProduct
): ProductValidationErrors => {
  const { price, stock } = product;
  const errors: ProductValidationErrors = {};

  if (price <= 0) {
    errors.price = "Price must be positive";
  }
  if (stock.available < 0) {
    errors.stockAvailable = "Stock available can't be negative";
  }
  return errors;
};
