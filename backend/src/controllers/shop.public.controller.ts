import shopService from "../services/shop.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const allProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.shopId) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    const page = Number(req.query.page) || 1;
    const search = (req.query.search as string) || "";

    const data = await shopService.findAllProducts(req.shopId, page, search);

    if (!data?.result || data.result.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    res
      .status(200)
      .json({ products: data.result, totalCount: data.totalCount });
  },
);

export const productByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.params;

    const shopId = req.shopId;
    const productId = Number(data.productId);

    const product = await shopService.findProductById(productId, shopId);

    if (!product) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ product });
  },
);

export default {
  allProductsController,
  productByIdController,
};
