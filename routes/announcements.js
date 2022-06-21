const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement.model');

router.route('/').get((req, res) => {
    Announcement.find()
        .then(announcements => res.json(announcements))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const price = Number(req.body.price);
    const date = Date.parse(req.body.date);

    const newAnnouncement = new Announcement({
        username,
        description,
        price,
        date
    });

    newAnnouncement.save()
        .then(() => res.json('Announcement added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;