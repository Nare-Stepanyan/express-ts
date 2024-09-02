import { ProductCategoryEnum } from "../types/enums/product-category.enum";
import { IProduct } from "../types/interfaces/product.interface";

type ProductValidationErrors = {
  price?: string;
  stockAvailable?: string;
  name?: string;
  description?: string;
  category?: string;
};

export const productValidator = (
  product: IProduct
): ProductValidationErrors => {
  const { price, stock, name, description, category } = product;
  const errors: ProductValidationErrors = {};

  if (!name) {
    errors.name = "Name is required";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (price === undefined || price <= 0) {
    errors.price = "Price must be a positive number";
  }
  if (!category) {
    errors.category = "Category is required";
  }
  if (!stock || stock.available === undefined || stock.available < 0) {
    errors.stockAvailable = "Stock available must be a non-negative integer";
  }

  return errors;
};
