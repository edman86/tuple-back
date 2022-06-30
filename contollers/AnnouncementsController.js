import Announcement from "../models/Announcement";

export const getAll = async (req, res) => {
    try {
        const posts = await Announcement.find().populate('user').exec();
        res.json(posts);

    } catch (err) {
        res.status(500).json({
            message: 'Failed to get announcements'
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        Announcement.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: 'after'
        },
        (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to return advertisement'
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Announcement not found'
                });
            }

            res.json(doc);
        })

        res.json(posts);

    } catch (err) {
        res.status(500).json({
            message: 'Failed to get announcements'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new Announcement({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId, 
        });

        const announcement = await doc.save();
        res.json(announcement);

    } catch (err) {
        res.status(500).json({
            message: "Can't create announcement" 
        });
    }
};