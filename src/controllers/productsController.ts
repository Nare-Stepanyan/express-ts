import { NextFunction, Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductAddressStreetService,
} from "../services/productsService";
import { catchAsync } from "../helpers/catchAsync";

export const getProducts = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const products = await getAllProductsService(req.query.category as string);

    return res.status(200).json({
      status: "success",
      result: products.length,
      data: products,
    });
  }
);

export const getProduct = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const product = await getProductByIdService(Number(req.params.id));

    return res.status(200).json({
      status: "success",
      data: product,
    });
  }
);

export const createProduct = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const createdProduct = await createProductService(req.body);
    return res.status(201).json({
      status: "success",
      product: createdProduct,
    });
  }
);

export const updateProductManufacturerAddressStreet = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const updatedProduct = await updateProductAddressStreetService(
      Number(req.params.id),
      req.query.street as string
    );

    return res.status(200).json({
      status: "success",
      product: updatedProduct,
    });
  }
);

export const deleteProduct = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    await deleteProductService(Number(req.params.id));

    return res.status(204).json({
      status: "success",
      message: "Product deleted",
    });
  }
);
