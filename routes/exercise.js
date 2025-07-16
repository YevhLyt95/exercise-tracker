//Logic of POST/api/users/:_id/exercises and GET/api/users/:_id/logs
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const e = require('express');

router.post('../:id/exercises', async (req, res) => {
    const { description, duration, date } = req.body;
    const userId = req.params.id;

    try {
        const user = await UserActivation.findById(userId);
        if (!user) return res.status(400).json({ error: 'User not found' });

        const exercise = new Exercise({
            userId,
            description,
            duration: parseInt(duration),
            date: date ? new Date(date) : new Date()
        });
        const saved = await exercise.save();
        res.json({
            username: user.username,
            description: saved.description,
            duration: saved.date.toDateString(),
            _id: user._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;