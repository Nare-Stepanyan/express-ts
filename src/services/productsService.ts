import { IProduct } from "../types/interfaces/product.interface";
import {
  readProductsFromFile,
  writeProductsToFile,
} from "../helpers/productsFileReadWrite";
import { ProductCategoryEnum } from "../types/enums/product-category.enum";

export const createProductService = async (
  newProduct: IProduct
): Promise<IProduct> => {
  const data = await readProductsFromFile();
  data.products.push(newProduct);
  await writeProductsToFile(data);
  return newProduct;
};

export const getAllProductsService = async (
  category?: string
): Promise<IProduct[]> => {
  const { products } = await readProductsFromFile();

  return products.filter(
    (product) =>
      (!category || product.category === category) && !product.deleted
  );
};

export const getProductByIdService = async (
  id: number
): Promise<IProduct | undefined> => {
  const data = await readProductsFromFile();
  return data.products.find((product) => product.id === id);
};

export const updateProductService = async (
  id: number,
  updatedData: Partial<IProduct>
): Promise<IProduct | null> => {
  const data = await readProductsFromFile();
  const productIndex = data.products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return null;
  }

  const updatedProduct = { ...data.products[productIndex], ...updatedData };
  data.products[productIndex] = updatedProduct;
  await writeProductsToFile(data);

  return updatedProduct;
};

export const deleteProductService = async (id: number): Promise<boolean> => {
  const data = await readProductsFromFile();
  const productIndex = data.products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return false;
  }

  data.products[productIndex].deleted = true;

  await writeProductsToFile(data);
  return true;
};
