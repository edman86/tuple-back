import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    adress: String,
    imageUrl: String,
    category: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.model('Announcement', AnnouncementSchema);