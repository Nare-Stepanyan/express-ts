import { IProduct } from "../types/interfaces/product.interface";
import {
  readProductsFromFile,
  writeProductsToFile,
} from "../helpers/productsFileReadWrite";
import { findProductIndexById } from "../helpers/findProductById";
import { updateManufacturerAddress } from "../helpers/updateManufacturerAddress";

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
): Promise<IProduct | null> => {
  const data = await readProductsFromFile();
  const productIndex = findProductIndexById(data.products, id);

  return data.products[productIndex];
};

export const updateProductAddressStreetService = async (
  id: number,
  street: string
): Promise<IProduct | null> => {
  const data = await readProductsFromFile();
  const productIndex = findProductIndexById(data.products, id);

  const updatedProduct = updateManufacturerAddress(
    data.products[productIndex],
    street
  );

  await writeProductsToFile(data);

  return updatedProduct;
};

export const deleteProductService = async (id: number): Promise<boolean> => {
  const data = await readProductsFromFile();
  const productIndex = findProductIndexById(data.products, id);

  data.products[productIndex].deleted = true;

  await writeProductsToFile(data);
  return true;
};
