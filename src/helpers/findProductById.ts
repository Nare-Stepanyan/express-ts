import { IProduct } from "../types/interfaces/product.interface";

export const findProductIndexById = (
  products: IProduct[],
  id: number
): number => {
  const productIndex = products.findIndex(
    (product) => Number(product.id) === id && !product.deleted
  );
  return productIndex;
};
