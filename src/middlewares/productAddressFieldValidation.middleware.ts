import { Request, Response, NextFunction } from "express";

export const validateProductAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const street = req.body.street as string;

  if (!street) {
    return res.status(400).json({
      status: "error",
      message: "Street field is required for update",
    });
  }
  next();
};
