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
    viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: String
}, {timestamps: true});

export default mongoose.model('Announcement', AnnouncementSchema);