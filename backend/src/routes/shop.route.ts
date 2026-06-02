import { Router } from "express";
const router = Router();

import shopController from "../controllers/shop.controller";
import customerController from "../controllers/customer.controller";

router.post("/create", shopController.createShop);

//    Products
router.get("/:id/products", shopController.allProductsController);
router.get("/:id/products/:productId", shopController.productByIdController);
router.post("/:id/products", shopController.createProductController);
router.put(
  "/:id/products/:productId/update",
  shopController.updateProductController,
);
router.delete(
  "/:id/products/:productId",
  shopController.deleteProductController,
);

//    Customers
router.get("/:id/customers", customerController.allCustomerController);

export default router;
