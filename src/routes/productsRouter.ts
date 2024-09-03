import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProductManufacturerAddressStreet,
} from "../controllers/productsController";
import { checkProduct } from "../middlewares/productNotFound.middleware";
import { validateProductCreation } from "../middlewares/productCreationValidation.middleware";

const router = Router();
router.param("id", checkProduct);

router.route("/").get(getProducts).post(validateProductCreation, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(updateProductManufacturerAddressStreet)
  .delete(deleteProduct);

export default router;
