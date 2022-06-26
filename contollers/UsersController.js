import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
    // request data: email, password
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User is not found'
            });
        }

        const { passwordHash, ...userData } = user._doc;
        res.json(userData);

    } catch (err) {
        res.status(500).json({
            message: 'No access'
        })
    }
};

export const register = async (req, res) => {
    // request data: username, email, password, avatarLink?
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            username: req.body.username,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl
        });

        const user = await doc.save();
        const token = jwt.sign(
            { _id: user._id },
            'privateKey'
        );

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });

    } catch (err) {
        res.status(500).json({
            message: 'Failed to register'
        });
    }
};

export const login = async (req, res) => {
    // request data: email, password
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'User is not found'
            });
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password, user._doc.passwordHash
        );
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Incorrect login or password'
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            'privateKey'
        );

        // destructuring passwordHash to exlude it from res
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });

    } catch (err) {
        res.status(500).json({
            message: 'Authorization is failed'
        });
    }
};
