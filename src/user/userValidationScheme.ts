import { body } from "express-validator";

const addUserSchema = [
    body('name').notEmpty().withMessage('Field name is required'),
    body('email').notEmpty().isEmail().withMessage('Field email is required'),
    body('password').notEmpty().withMessage('Field password is required'),
    body('role').notEmpty().withMessage('Field role is required').isIn(['admin', 'user']).withMessage('Role is invalid'),
]
export {
    addUserSchema,
};
