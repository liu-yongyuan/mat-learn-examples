// test/authController.test.js
import request from "supertest";
import { app, serverConfig } from "../app";

// Global variable to store the JWT token
let token;

describe("Authentication and Protected Routes", () => {
    it("should return a token for valid credentials", async () => {
        console.log(`url prefix`, serverConfig.baseUrl);

        const user = {
            email: "john.doe@example.com",
            password: "password123",
        };
        // Login to get a JWT token
        const res = await request(app).post(`/api/v1/login`).send(user).set("Content-Type", "application/json; charset=utf-8");

        console.log(`login ${serverConfig.baseUrl}/login resbody: ${JSON.stringify(res.body)}`);

        console.log(res.text);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.token).toBeDefined();

        // Store the token for future use in protected route test
        token = res.body.token;

        console.log(res.body);
    });

    /* it("should access a protected route using the JWT token", async () => {
        let date = new Date();
        const res = await request(app)
            .post(`${baseUrl}/products`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: `SmartPC ${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getMilliseconds()}`,
                description: "A high-end SmartPC with a large screen",
                price: 699.99,
                stock_quantity: 50,
                category_id: 2,
            });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Product added successfully");
    }); */
});
