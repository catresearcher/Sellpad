import customerService from "../services/customer.service";
import shopService from "../services/shop.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const allCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const shopId = Number(req.params.id);

    if (!shopId || isNaN(shopId)) {
      return res.status(400).json({ error: "Invalid shop ID" });
    }

    const isUserShop = await shopService.checkShopOwnership(
      req.user.id,
      shopId,
    );

    if (!isUserShop) {
      return res.status(401).json({ error: "Invalid shop ID" });
    }

    const page = Number(req.query.page) || 1;
    const search = (req.query.search as string) || "";

    const data = await customerService.getAllCustomers(shopId, page, search);

    if (!data?.result || data.result.length === 0) {
      return res.status(404).json({ error: "No customers found" });
    }

    res.status(200).json({ customers: data.result, pages: data.pages });
  },
);

export const productByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = req.params;

    const shopId = Number(data.id);
    const productId = Number(data.productId);

    if (!shopId || isNaN(shopId)) {
      return res.status(400).json({ error: "Invalid shop ID" });
    }

    if (!productId || isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const isUserShop = await shopService.checkShopOwnership(
      req.user.id,
      shopId,
    );

    if (!isUserShop) {
      return res.status(201).json({ error: "Unauthorized" });
    }

    const product = await shopService.findProductById(productId, shopId);

    if (!product) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ product });
  },
);

export default {
  allCustomerController,
};
