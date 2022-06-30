import express from 'express';
import User from '../models/User.js';
import { regValidators, loginValidators,  } from '../validators/auth.js';
import checkAuth from '../middlewares/checkAuth.js';
import * as UsersController from '../contollers/UsersController.js';

export const router = express.Router();

router.route('/auth/current').get(checkAuth, UsersController.getCurrentUser);

router.route('/auth/login').post(loginValidators, UsersController.login);

router.route('/auth/register').post(regValidators, UsersController.register);
