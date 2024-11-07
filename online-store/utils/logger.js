import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";
dotenv.config();

// Define log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
        ({ timestamp, level, message }) =>
            `${timestamp} [${level.toUpperCase()}]: ${message}`,
    ),
);

// Initialize the logger
const logger = createLogger({
    level: process.env.LOG_LEVEL || "info", // Set log level (default: 'info')
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/combined.log" }), // All logs go to a combined file
    ],
    exceptionHandlers: [
        new transports.File({ filename: "logs/error.log", level: "error" }), // Error logs go to file
    ],
});

export default logger;
