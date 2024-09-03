import express from "express";
import morgan from "morgan";
import productsRouter from "./routes/productsRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/products", productsRouter);

export default app;
