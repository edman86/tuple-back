import { body } from 'express-validator';

export const announcementValidators = [
    body('title', 'Enter the title').isString(),
    body('description', 'Enter a description').isString(),
    body('tags', 'Please add tags').optional().isArray(),
    body('imageUrl', 'Invalid image link').optional().isString()
];