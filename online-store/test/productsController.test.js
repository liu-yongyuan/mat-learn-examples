// tests/app.test.js
import request from "supertest";
import app from "../server.js";
import { serverConfig } from "../app.js";

let { baseUrl } = serverConfig;

describe("productes test", () => {
    it("should fetch all products", async () => {
        const res = await request(app).get(`${baseUrl}/products`);

        // Check status code
        expect(res.statusCode).toBe(200);

        // Check response body structure
        expect(Array.isArray(res.body)).toBe(true);

        // Validate the content of the response
        expect(res.body[0]).toHaveProperty("product_id");
        expect(res.body[0]).toHaveProperty("name");
    });

    let productId;
    it("should add product", async () => {
        let date = new Date();
        const newProducts = {
            name: `[Jest][testing][insert]SmartPC ${date.toLocaleDateString()}T${date.toLocaleTimeString()}`,
            description: "A high-end SmartPC with a large screen",
            price: 699.99,
            stock_quantity: 50,
            category_id: 2,
        };
        const res = await request(app).post(`${baseUrl}/products`).send(newProducts).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(201);

        expect(res.body.message).toBe("Product added successfully");

        productId = res.body.productId;
    });

    it("should find newed product", async () => {
        const res = await request(app).get(`${baseUrl}/products/${productId}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.product_id).toBe(productId);
    });

    it("should update product", async () => {
        let date = new Date();
        const products = {
            id: productId,
            name: `[Jest][testing][update]SmartPC ${date.toLocaleDateString()}T${date.toLocaleTimeString()}`,
            description: "A high-end SmartPC with a large screen",
            price: 699.99,
            stock_quantity: 50,
            category_id: 2,
        };
        const res = await request(app).put(`/api/v1/products/${productId}`).send(products).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product updated successfully");
    });

    it("should delete product", async () => {
        const res = await request(app).delete(`/api/v1/products/${productId}`).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product deleted successfully");
    });
});
