import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productsController";

const router = Router();

router.get("/", getProducts).post("/", createProduct);

router
  .get("/:id", getProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
