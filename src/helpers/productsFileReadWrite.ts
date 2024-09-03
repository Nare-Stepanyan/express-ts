import fs from "fs-extra";
import path from "path";
import { IProductsList } from "../types/interfaces/product.interface";

const productsFilePath = path.join(__dirname, "../data/products.json");

export const readProductsFromFile = async (): Promise<IProductsList> => {
  try {
    const data: IProductsList = await fs.readJson(productsFilePath);
    return data;
  } catch (err) {
    throw new Error("Could not read products file.");
  }
};

export const writeProductsToFile = async (
  data: IProductsList
): Promise<void> => {
  try {
    await fs.writeJson(productsFilePath, data, { spaces: 2 });
  } catch (err) {
    throw new Error("Could not write to products file.");
  }
};
