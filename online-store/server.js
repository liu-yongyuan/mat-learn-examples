import { app } from "./app.js";
import { promisePool } from "./dbPool.js";

//  Route to get all products
app.get("/products", async (req, res) => {
    try {
        const [rows] = await promisePool.query("select * from products");
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
});

// Route to get a single product by ID
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await promisePool.query(
            "select * from products where product_id = ?",
            id,
        );
        if (rows.length === 0) {
            return res.sendStatus(404).json({ error: "Product not found" });
        }
        res.json(rows[0]);
    } catch (e) {
        console.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
});

app.post("/products", async (req, res) => {
    const { name, description, price, stock_quantity, category_id } = req.body;
    try {
        const [result] = await promisePool.query(
            "INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)",
            [name, description, price, stock_quantity, category_id],
        );
        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Route to update an existing product
app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock_quantity, category_id } = req.body;
    try {
        const [result] = await promisePool.query(
            "UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE product_id = ?",
            [name, description, price, stock_quantity, category_id, id],
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Route to delete a product
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await promisePool.query(
            "DELETE FROM products WHERE product_id = ?",
            [id],
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception: ", err);
    // Optionally, log the error or send alerts
    // Do not call process.exit() to prevent the process from exiting
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection: ", reason);
    // Optionally, log the rejection or send alerts
    // Do not call process.exit() to prevent the process from exiting
});