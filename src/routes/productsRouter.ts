import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProductManufacturerAddressStreet,
} from "../controllers/productsController";

const router = Router();

router.get("/", getProducts).post("/", createProduct);

router
  .get("/:id", getProduct)
  .patch("/:id", updateProductManufacturerAddressStreet)
  .delete("/:id", deleteProduct);

export default router;
