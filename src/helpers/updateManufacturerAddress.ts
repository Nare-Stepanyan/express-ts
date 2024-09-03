import { IProduct } from "../types/interfaces/product.interface";

export const updateManufacturerAddress = (
  product: IProduct,
  street: string
): IProduct => {
  if (product.manufacturer) {
    product.manufacturer.address.street = street;
  } else {
    product.manufacturer = {
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
  return product;
};
