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
import { validateProductCategory } from "../middlewares/productCategoryValidation.middleware";
import { createNewProduct } from "../middlewares/productCreation.middleware";
import { validateProductAddress } from "../middlewares/productAddressFieldValidation.middleware";

const router = Router();
router.param("id", checkProduct);

router
  .route("/")
  .get(validateProductCategory, getProducts)
  .post(validateProductCreation, createNewProduct, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(validateProductAddress, updateProductManufacturerAddressStreet)
  .delete(deleteProduct);

export default router;
