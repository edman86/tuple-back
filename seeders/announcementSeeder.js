import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import * as AnnouncementController from '../AnnouncementsController.js';

app.post(
    '/posts', 
    checkAuth, 
    announcementValidators, 
    handleValidationErrors, 
    AnnouncementController.create
);