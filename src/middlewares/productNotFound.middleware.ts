import { NextFunction, Request, Response } from "express";
import { readProductsFromFile } from "../helpers/productsFileReadWrite";

export const checkProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await readProductsFromFile();
    const productIndex = data.products.findIndex(
      (product) => Number(product.id) === Number(id) && !product.deleted
    );

    if (productIndex === -1) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing request.",
    });
  }
};
