import { Request, Response } from "express";
import { IProduct } from "../types/interfaces/product.interface";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductAddressStreetService,
} from "../services/productsService";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await getAllProductsService(
      req.query.validCategory as string
    );

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
  try {
    const product = await getProductByIdService(Number(req.params.id));

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err instanceof Error && err.message,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const createdProduct = await createProductService(req.body);
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
  try {
    const updatedProduct = await updateProductAddressStreetService(
      Number(req.params.id),
      req.query.street as string
    );

    return res.status(200).json({
      status: "success",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err instanceof Error && err.message,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await deleteProductService(Number(req.params.id));

    return res.status(204).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err instanceof Error && err.message,
    });
  }
};
