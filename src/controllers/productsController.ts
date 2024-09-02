import { Request, Response } from "express";
import { IProduct } from "../types/interfaces/product.interface";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/productsService";

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await getAllProductsService();
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
  const product = await getProductByIdService(parseInt(id));

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
    const newId = Date.now();
    const newProduct: IProduct = { id: newId, ...req.body };

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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updatedProduct = await updateProductService(parseInt(id), req.body);

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
  const success = await deleteProductService(parseInt(id));

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
