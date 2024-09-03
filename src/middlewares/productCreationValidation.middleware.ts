import { Request, Response, NextFunction } from "express";
import { productValidator } from "../helpers/validateProductsFields";

export const validateProductCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = productValidator(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }
  next();
};
