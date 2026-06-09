import { Router } from "express";
const router = Router();

import shopController from "../controllers/shop.controller";
import customerController from "../controllers/customer.controller";
import { TenantMiddleware } from "../middlewares/tenantMiddleware";
import { sessionAuth } from "../middlewares/authMiddleware";
import shopPublicController from "../controllers/shop.public.controller";

//    Public endpoints
router.get(
  "/products",
  TenantMiddleware,
  shopPublicController.allProductsController,
);
router.get(
  "/products/:productId",
  TenantMiddleware,
  shopPublicController.productByIdController,
);

router.post("/create", sessionAuth, shopController.createShop);

//    Products
router.get("/:id/products", sessionAuth, shopController.allProductsController);
router.get(
  "/:id/products/:productId",
  sessionAuth,
  shopController.productByIdController,
);
router.post(
  "/:id/products",
  sessionAuth,
  shopController.createProductController,
);
router.put(
  "/:id/products/:productId/update",
  sessionAuth,
  shopController.updateProductController,
);
router.delete(
  "/:id/products/:productId",
  sessionAuth,
  shopController.deleteProductController,
);

//    Customers
router.get(
  "/:id/customers",
  sessionAuth,
  customerController.allCustomerController,
);

export default router;
