import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/interfaces/customError.interface";

export const handleGlobalErrors = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
