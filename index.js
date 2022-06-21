const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const announcementsRouter = require('./routes/announcements');
 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection success');
});

app.get('/', (req, res) => {
    res.send('Yo dude!')
});

app.use('/users', usersRouter);
app.use('/announcements', announcementsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});