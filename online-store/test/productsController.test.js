// tests/app.test.js
import request from "supertest";
import app from "../server.js";

describe("GET /api/v1/products", () => {
    it("should fetch all products", async () => {
        const res = await request(app).get("/api/v1/products");

        // Check status code
        expect(res.statusCode).toBe(200);

        // Check response body structure
        expect(Array.isArray(res.body)).toBe(true);

        // Validate the content of the response
        expect(res.body[0]).toHaveProperty("product_id");
        expect(res.body[0]).toHaveProperty("name");
    });
});
