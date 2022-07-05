import { body } from 'express-validator';

export const announcementValidators = [
    body('title', 'Enter the title').isString(),
    body('description', 'Enter a description').isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
    body('phoneNumber', 'Phone number cannot be less than 7 characters').isString(),
    body('adress', 'Enter the adress').optional().isString(),
    body('category', 'Choose category').isString()
];