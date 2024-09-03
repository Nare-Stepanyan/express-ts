import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import productsRouter from "./routes/productsRouter";
import AppError from "./helpers/handleAppErrors";
import { handleGlobalErrors } from "./helpers/globalErrorHandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/products", productsRouter);

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(handleGlobalErrors);

export default app;
