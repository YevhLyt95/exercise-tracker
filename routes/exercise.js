//Logic of POST/api/users/:_id/exercises and GET/api/users/:_id/logs
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Exercise = require('../models/Exercise');
const e = require('express');

router.post('/:id/exercises', async (req, res) => {
    const { description, duration, date } = req.body;
    const dateObj = date ? new Date(date) : new Date();
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
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
            duration: saved.duration,
            date: dateObj.toDateString(),
            _id: user._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//filtration
router.get('/:id/logs', async (req, res) => {
    const { from, to, limit } = req.query;
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: 'User not found' });
        //create filter by date
        let dateFilter = {};
        if (from) dateFilter.$gte = new Date(from);
        if (to) dateFilter.$lte = new Date(to);

        const query = { userId };
        if (from || to) query.date = dateFilter;
        const exercises = await Exercise.find(query)
            .limit(limit ? parseInt(limit) : 0);
        res.json({
            username: user.username,
            count: exercises.length,
            _id: user._id,
            log: exercises.map(e => ({
                description: e.description,
                duration: e.duration,
                date: e.date.toDateString()
            }))
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;