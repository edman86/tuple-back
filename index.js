import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';

import * as UsersController from './contollers/UsersController.js';
import * as AnnouncementController from './contollers/AnnouncementsController.js';

import { regValidators, loginValidators } from './validators/auth.js';
import { announcementValidators } from './validators/announcement.js';
import handleValidationErrors from './middlewares/handleValidationErrors.js';
import checkAuth from './middlewares/checkAuth.js';

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
  
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => console.log('Connection success'))
    .catch((err) => console.log('Error', err));

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.get('/auth/me', checkAuth, UsersController.getCurrent);
app.post('/auth/login', loginValidators, handleValidationErrors, UsersController.login);
app.post('/auth/register', regValidators, handleValidationErrors, UsersController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/tags', AnnouncementController.getLastTags);

app.get('/posts', AnnouncementController.getAll);
app.get('/posts/tags', AnnouncementController.getLastTags);
app.get('/posts/:id', AnnouncementController.getOne);
app.post(
    '/posts', 
    checkAuth, 
    announcementValidators, 
    handleValidationErrors, 
    AnnouncementController.create
);
app.delete('/posts/:id', checkAuth, AnnouncementController.remove);
app.patch(
    '/posts/:id',
    checkAuth,
    announcementValidators,
    handleValidationErrors,
    AnnouncementController.update,
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
