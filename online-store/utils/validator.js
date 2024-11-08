import Joi from "joi";

// Example validation schemas
const schemas = {
    // Testing Schema for validating user registration data
    userRegistration: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),

    // Schema for validating product data
    products: Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().precision(2).required(),
        description: Joi.string().optional(),
        stock_quantity: Joi.number().integer().min(0).required(),
        category_id: Joi.number().integer().required(),
    }),
};

// Function to validate data against a schema
const validate = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        return error.details.map((detail) => detail.message); // Returns an array of error messages
    }
    return null; // No errors
};

export { schemas, validate };
