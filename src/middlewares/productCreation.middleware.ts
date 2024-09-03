import { NextFunction, Request, Response } from "express";
import { IProduct } from "../types/interfaces/product.interface";

export const createNewProduct = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
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
  req.body = newProduct;
  next();
};
