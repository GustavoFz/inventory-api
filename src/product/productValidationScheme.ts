import { body } from "express-validator";

const addProductSchema = [
    body('name').notEmpty().withMessage('Field name is required'),
    body('brandId').isMongoId().notEmpty().withMessage('Field brand is required'),
    body('groupId').isMongoId().notEmpty().withMessage('Field group is required').isIn(['admin', 'user']).withMessage('Role is invalid'),
    body('subgroupId').optional().isMongoId(),
    body('barCode').optional().isString(),
    body('controlSerialNumber').notEmpty().isBoolean().withMessage('Field email is required'),
]

const updateProductSchema = [
    body('id').isMongoId().notEmpty().withMessage('Field id is required'),
    body('name').notEmpty().withMessage('Field name is required'),
    body('brandId').isMongoId().notEmpty().withMessage('Field brand is required'),
    body('groupId').isMongoId().notEmpty().withMessage('Field group is required').isIn(['admin', 'user']).withMessage('Role is invalid'),
    body('subgroupId').optional().isMongoId(),
    body('barCode').optional().isString(),
    body('controlSerialNumber').notEmpty().isBoolean().withMessage('Field email is required'),
]
export {
    addProductSchema,
    updateProductSchema,
};
