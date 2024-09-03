import { Request, Response, NextFunction } from "express";
import { QueryToEnumMap } from "../types/enums/product-category.enum";

export const validateProductCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.query;

  if (category) {
    const validCategory = QueryToEnumMap[(category as string)?.toLowerCase()];

    if (!validCategory) {
      return res.status(400).json({
        status: "error",
        message: `Invalid category: ${category}`,
      });
    }
    req.query.category = validCategory;
  }

  next();
};
