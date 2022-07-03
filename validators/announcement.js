import { body } from 'express-validator';

export const announcementValidators = [
    body('title', 'Enter the title').isString(),
    body('description', 'Enter a description').isString(),
    body('imageUrl', 'Invalid image link').optional().isString()
];