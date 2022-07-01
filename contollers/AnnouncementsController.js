import Announcement from "../models/Announcement.js";

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

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await Announcement.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
        );

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update ad',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        Announcement.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Failed to delete announcement',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Announcement not found',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Can't get announcements",
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get tags',
        });
    }
};
