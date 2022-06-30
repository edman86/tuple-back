import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { router as usersRouter } from './routes/usersRouter.js';
import { router as announcementsRouter } from './routes/announcementsRouter.js';
 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => console.log('Connection success'))
    .catch((err) => console.log('Error', err));

app.get('/', (req, res) => {
    res.send('Yo dude!')
});

app.use('/users', usersRouter);
app.use('/announcements', announcementsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
