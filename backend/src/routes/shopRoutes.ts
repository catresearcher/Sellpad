import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/shopController";

const router = Router();

router.get("/:id/products", getAllProducts);
router.get("/:id/products/:productId", getProductById);
router.post("/:id/products", createProduct);
router.put("/:id/products/:productId/update", updateProduct);

export default router;
