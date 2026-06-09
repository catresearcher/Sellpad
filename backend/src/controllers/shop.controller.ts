import { createProductFormSchema } from "../schemas/form.schema";
import { createShopSchema } from "../schemas/shop.schema";
import shopService from "../services/shop.service";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { deriveMerchantWallet } from "../utils/crypto/bitcoin/wallet";
import { deriveLitecoinMerchantWallet } from "../utils/crypto/litecoin/wallet";
import { deriveEthereumMerchantWallet } from "../utils/crypto/ethereum/wallet";
import { CryptoCurrency } from "../lib/database/generated";
import cryptoService from "../services/crypto.service";
import userService from "../services/user.service";

export const allProductsController = asyncHandler(
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
      return res.status(401).json({ error: "Not owner" });
    }

    const page = Number(req.query.page) || 1;
    const search = (req.query.search as string) || "";

    const data = await shopService.findAllProducts(shopId, page, search);

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
      return res.status(201).json({ error: "Not owner" });
    }

    const product = await shopService.findProductById(productId, shopId);

    if (!product) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ product });
  },
);

export const createProductController = asyncHandler(
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
      return res.status(401).json({ error: "Not owner" });
    }

    const result = createProductFormSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.issues,
      });
    }

    const validatedData = result.data;

    const product = await shopService.createProduct(shopId, validatedData);

    if (!product) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ message: "Product created successfully" });
  },
);

export const updateProductController = asyncHandler(
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
      return res.status(401).json({ error: "Not owner" });
    }

    const result = createProductFormSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.issues,
      });
    }

    const validatedData = result.data;

    const product = await shopService.updateProduct(
      shopId,
      productId,
      validatedData,
    );

    if (!product) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  },
);

export const deleteProductController = asyncHandler(
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
      return res.status(401).json({ error: "Not owner." });
    }

    const deleted = await shopService.deleteProduct(productId);

    res
      .status(200)
      .json({ message: "Product deleted successfully", product: deleted });
  },
);

export const createShop = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const result = createShopSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.issues,
    });
  }

  const validatedData = {
    userId: req.user!.id,
    ...result.data,
  };

  const shop = await shopService.createShop(validatedData);
  const btcAddress = deriveMerchantWallet(shop.id).address;
  const ltcAddress = deriveLitecoinMerchantWallet(shop.id).address;
  const ethAddress = deriveEthereumMerchantWallet(shop.id).address;

  if (!btcAddress || !ltcAddress || !ethAddress) {
    throw new Error("Missing wallet address");
  }

  await cryptoService.createWallets(req.user!.id, shop.id);

  const shops = await userService.findUserShopsById(req.user!.id);

  const createdShop = shops.find((s) => s.id === shop.id);

  res.status(200).json({
    message: "Shop created successfully",
    shop: createdShop,
  });
});

export default {
  allProductsController,
  productByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  createShop,
};
