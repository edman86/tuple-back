import express from 'express';
import { announcementValidators } from '../validators/announcement.js';
import checkAuth from '../middlewares/checkAuth.js';
import * as AnnouncementController from '../contollers/AnnouncementsController.js';

export const router = express.Router();

router.route('/').get(AnnouncementController.getAll);

// router.route('/:id').get(AnnouncementController.getOne);

router.route('/').post(
    checkAuth, announcementValidators, AnnouncementController.create
);

// router.route('/').delete(AnnouncementController.remove);

// router.route('/').patch(AnnouncementController.update);