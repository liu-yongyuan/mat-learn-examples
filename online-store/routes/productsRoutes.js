import express from "express";
import {
    deleteProducstById,
    getProductsById,
    insertProductsAndGetId,
    getAllProducts,
    updateProductsById,
} from "../controllers/productsController.js";
import { serverConfig } from "../app.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get all products
router.get(`${serverConfig.baseUrl}/products`, getAllProducts);

// Route to get a single product by ID
router.get(`${serverConfig.baseUrl}/products/:id`, getProductsById);

// Route to insert an product
router.post(
    `${serverConfig.baseUrl}/products`,
    authMiddleware,
    insertProductsAndGetId,
);

// Route to update an existing product
router.put(`${serverConfig.baseUrl}/products/:id`, updateProductsById);

// Route to delete a product
router.delete(`${serverConfig.baseUrl}/products/:id`, deleteProducstById);

export default router;
