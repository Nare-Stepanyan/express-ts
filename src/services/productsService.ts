import { IProduct } from "../types/interfaces/product.interface";
import {
  readProductsFromFile,
  writeProductsToFile,
} from "../helpers/productsFileReadWrite";

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
  return data.products.find(
    (product) => Number(product.id) === id && !product.deleted
  );
};

export const updateProductAddressStreetService = async (
  id: number,
  street: string
): Promise<IProduct | null> => {
  const data = await readProductsFromFile();
  const productIndex = data.products.findIndex(
    (product) => Number(product.id) === id && !product.deleted
  );

  if (productIndex === -1) {
    return null;
  }

  const updatedProduct = data.products[productIndex];
  if (updatedProduct.manufacturer) {
    updatedProduct.manufacturer.address = {
      ...updatedProduct.manufacturer.address,
      street,
    };
  } else {
    updatedProduct.manufacturer = {
      name: "",
      country: "",
      address: {
        street,
        city: "",
        state: "",
        zip: "",
      },
    };
  }

  await writeProductsToFile(data);

  return updatedProduct;
};

export const deleteProductService = async (id: number): Promise<boolean> => {
  const data = await readProductsFromFile();
  const productIndex = data.products.findIndex(
    (product) => Number(product.id) === id && !product.deleted
  );
  if (productIndex === -1) {
    return false;
  }

  data.products[productIndex].deleted = true;

  await writeProductsToFile(data);
  return true;
};
