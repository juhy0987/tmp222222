const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed.',
            errors: errors.array()
        });
    }

    const { email, password, nickname } = req.body;

    try {
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'E-mail address already exists!' });
        }

        const existingUserByNickname = await User.findOne({ nickname: nickname });
        if (existingUserByNickname) {
            return res.status(409).json({ message: 'Nickname is already taken!' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPassword,
            nickname: nickname
        });

        const result = await user.save();

        res.status(201).json({
            message: 'User created successfully!',
            user: {
                id: result._id,
                email: result.email,
                nickname: result.nickname
            }
        });
    } catch (err) {
        // In a real app, you'd want to log this error
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};