import { app } from "./app.js";
import productsRoute from "./routes/productsRoutes.js";

// define routes
app.use(productsRoute);

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
