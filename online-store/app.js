import fs from "fs";
import yaml from "js-yaml";
import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log(process.env.NODE_ENV);

const app = express();

// Load configuration from YAML file
const config = yaml.load(fs.readFileSync("./config/serverConfig.yaml", "utf8"));

// USE NODE_ENV or fallback to YAML env
const env = process.env.NODE_ENV || config.server.env;

// Get the config based on environment
const serverConfig = config.server[env] || config.server;

// Apply the configuration
const port = process.env.PORT || serverConfig.port;
const logLevel = serverConfig.logLevel || "info";
const baseUrl = serverConfig.baseUrl || "/api/v1";

// Set logging level based on configuration
console.log(`Server is running in ${env} mode.`);
console.log(`Using ${logLevel} level logging.`);

// Middleware: Express JSON parsing
app.use(express.json());

// Example route
app.get(`${baseUrl}/health`, (req, res) => {
    res.json({ message: "Server is running fine" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err); // Log the error
    res.status(500).json({ error: "Something went wrong!" }); // Respond with a 500 error
});

export { app };
