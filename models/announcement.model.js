const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {type: String },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
}, {timestamps: true});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;