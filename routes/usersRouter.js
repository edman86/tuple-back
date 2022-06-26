import express from 'express';
import User from '../models/User.js';
import { regValidators, loginValidators,  } from '../validators/auth.js';
import checkAuth from '../middlewares/checkAuth.js';
import * as UsersController from '../contollers/UsersController.js';

export const router = express.Router();

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/auth/current').post(checkAuth, UsersController.getCurrentUser);

router.route('/auth/login').post(loginValidators, UsersController.login);

router.route('/auth/register').post(regValidators, UsersController.register);
