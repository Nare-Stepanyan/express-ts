import { Request, Response } from "express";
import { IProduct } from "../types/interfaces/product.interface";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductAddressStreetService,
} from "../services/productsService";
import { QueryToEnumMap } from "../types/enums/product-category.enum";
import { productValidator } from "../helpers/validateProductsFields";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { category } = req.query;

    const validCategory = QueryToEnumMap[(category as string)?.toLowerCase()];

    const products = await getAllProductsService(validCategory);

    return res.status(200).json({
      status: "success",
      result: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err instanceof Error && err.message,
    });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const product = await getProductByIdService(Number(id));

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: product,
  });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = productValidator(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }

    const newId = Date.now();

    const newProduct: IProduct = {
      id: newId,
      name: req.body.name!,
      description: req.body.description!,
      price: req.body.price!,
      category: req.body.category!,
      stock: req.body.stock!,
      tags: req.body.tags || [],
      rating: req.body.rating || 0,
      deleted: req.body.deleted || false,
      manufacturer: req.body.manufacturer || {
        name: "",
        address: { street: "", city: "", state: "", zip: "" },
      },
    };

    const createdProduct = await createProductService(newProduct);
    return res.status(201).json({
      status: "success",
      product: createdProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err instanceof Error && err.message,
    });
  }
};

export const updateProductManufacturerAddressStreet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const street = req.body.street as string;

  if (!street) {
    return res.status(400).json({
      status: "error",
      message: "Street field is required for update",
    });
  }
  const updatedProduct = await updateProductAddressStreetService(
    Number(id),
    street
  );

  if (!updatedProduct) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    product: updatedProduct,
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const success = await deleteProductService(Number(id));

  if (!success) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  return res.status(204).json({
    status: "success",
    message: "Product deleted",
  });
};
