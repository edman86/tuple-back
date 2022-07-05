import { body } from 'express-validator';

export const regValidators = [
    body('username', 'Name cannot be less than 3 characters').isLength({min: 3}),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be less than 5 characters').isLength({min: 5}),
    body('avatarUrl', 'Invalid avatar link').optional().isURL()
];

export const loginValidators = [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be less than 5 characters').isLength({min: 5})
];