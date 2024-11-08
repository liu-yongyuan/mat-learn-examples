// tests/validator.test.js
import { schemas, validate } from '../utils/validator.js';

describe('User Registration Validation', () => {
    it('should pass validation with valid data', () => {
        const validData = {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
        };
        const errors = validate(validData, schemas.userRegistration);
        expect(errors).toBeNull();
    });

    it('should fail validation with an invalid email', () => {
        const invalidData = {
            username: 'john_doe',
            email: 'not-an-email',
            password: 'password123',
        };
        const errors = validate(invalidData, schemas.userRegistration);
        expect(errors).toContain('"email" must be a valid email');
    });

    it('should fail validation with a short password', () => {
        const invalidData = {
            username: 'john_doe',
            email: 'john@example.com',
            password: '123',
        };
        const errors = validate(invalidData, schemas.userRegistration);
        expect(errors).toContain('"password" length must be at least 8 characters long');
    });
});
